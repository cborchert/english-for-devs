import type {
	ChaptersResponse,
	ProgressResponse,
	QuestionsResponse
} from '$lib/types/pocketbaseTypes';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

const MIN_EASE = 1.5;
const EASE_DELTA_WRONG = -0.4;
const EASE_DELTA_HARD = -0.2;
const EASE_DELTA_MEDIUM = 0;
const EASE_DELTA_EASY = 0.3;

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 60;

const MAX_TIME_EASY = 5_000; // 5 seconds
const MAX_TIME_MEDIUM = 10_000; // 10 seconds

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const load = (async ({ params, locals, url }) => {
	// logged in users are redirected to the app
	if (!locals.user) {
		throw redirect(303, '/');
	}

	// load exercise data
	const { slug } = params;

	const allowAllQuestions = url.searchParams.get('allQuestions') === 'true';
	const questionsInRandomOrder = url.searchParams.get('random') === 'true';

	const chapters: ChaptersResponse<{ questions: QuestionsResponse[] }>[] =
		(await locals.pb.collection('chapters').getFullList(200, {
			filter: `slug = "${slug}"`,
			expand: 'questions'
		})) || [];
	const [exercise] = chapters;

	const progress: ProgressResponse[] = await locals.pb.collection('progress').getFullList(200, {
		filter: `user.id = "${locals.pb?.authStore?.model?.id}" && chapter = "${exercise?.id}"`
	});

	const completedQuestionIds = progress?.[0]?.completedQuestions || [];
	const incompleteQuestionIds =
		exercise.questions?.filter((questionId) => !completedQuestionIds.includes(questionId)) || [];
	const possibleQuestions =
		(allowAllQuestions
			? exercise.expand?.questions
			: exercise.expand?.questions?.filter((question) =>
					incompleteQuestionIds.includes(question.id)
			  )) || [];
	const nextQuestions = possibleQuestions
		.sort(() => (questionsInRandomOrder ? Math.random() - 0.5 : 0))
		.slice(0, 10)
		.map((question) => ({
			id: question.id,
			questionType: question.questionType,
			title: question.title,
			question: question.question,
			options: question.options,
			answers: question.answers,
			responseAudioUrl: question.responseAudioUrl,
			// TODO: add additional options such as keepOrder to question record
			keepOrder: false,
			responseCaseSensitive: false,
			exactResponseOnly: false
		}));

	return {
		exerciseId: exercise.id,
		questions: nextQuestions
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	saveProgress: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		const { attempts: attemptsJson, exerciseId } = body;
		let attempts: Attempt[] = [];
		if (attemptsJson && typeof attemptsJson === 'string') {
			try {
				attempts = JSON.parse(attemptsJson);
			} catch (err) {
				console.error(err);
			}
		}

		/////////////////////
		// update progress //
		/////////////////////
		// get or create progress record
		let [previousProgress] = await locals.pb.collection('progress').getFullList(200, {
			filter: `user.id = "${locals.pb?.authStore?.model?.id}" && chapter = "${exerciseId}"`
		});
		if (!previousProgress) {
			previousProgress = await locals.pb.collection('progress').create({
				user: locals.pb?.authStore?.model?.id,
				chapter: exerciseId,
				completedQuestions: [],
				attempts: [],
				percentComplete: undefined
			});
		}
		// calculate completions: if a question was attempted only once, and with success, add it to the completedQuestions array
		const newCompletions = attempts
			.filter(
				({ questionId }) =>
					attempts.filter((attempt) => attempt.questionId === questionId).length === 1
			)
			.filter(({ success }) => success)
			.map(({ questionId }) => questionId);
		// save progress
		await locals.pb.collection('progress').update(previousProgress.id, {
			completedQuestions: [...previousProgress.completedQuestions, ...newCompletions]
		});

		////////////////////
		// update mastery //
		////////////////////
		const firstAttemptsByQuestion = attempts
			.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
			.reduce((acc, attempt) => {
				if (!acc.find((a) => a.questionId === attempt.questionId)) {
					return [...acc, attempt];
				}
				return acc;
			}, [] as Attempt[]);

		for (const attempt of firstAttemptsByQuestion) {
			// get or create mastery record
			let [previousMastery] = await locals.pb.collection('mastery').getFullList(200, {
				filter: `user.id = "${locals.pb?.authStore?.model?.id}" && question = "${attempt.questionId}"`
			});
			if (!previousMastery) {
				previousMastery = await locals.pb.collection('mastery').create({
					user: locals.pb?.authStore?.model?.id,
					question: attempt.questionId,
					attempts: [],
					ease: 2,
					interval: 2,
					nextScheduledAttempt: undefined
				});
			}

			// calculate new ease and interval
			let newEase = previousMastery.ease;
			let newInterval = previousMastery.interval;
			if (attempt.success) {
				// difficulty level is based on time taken
				if (attempt.timeTakenInMs >= MAX_TIME_MEDIUM) {
					// 3 (hard) >= 10 seconds
					newEase = Math.max(newEase + EASE_DELTA_HARD, MIN_EASE);
					newInterval = Math.min(Math.max(newInterval * 1.2, MIN_INTERVAL), MAX_INTERVAL);
				} else if (attempt.timeTakenInMs > MAX_TIME_EASY) {
					// 2 (medium) >= 5 seconds
					newEase = Math.max(newEase + EASE_DELTA_MEDIUM, MIN_EASE);
					newInterval = Math.min(Math.max(newInterval * newEase, MIN_INTERVAL), MAX_INTERVAL);
				} else {
					// 1 (easy) < 5 seconds
					newEase = Math.max(newEase + EASE_DELTA_EASY, MIN_EASE);
					newInterval = Math.min(Math.max(newInterval * newEase, MIN_INTERVAL), MAX_INTERVAL);
				}
			} else {
				// Wrong answer
				newEase = Math.max(newEase + EASE_DELTA_WRONG, MIN_EASE);
				newInterval = 1;
			}

			// calculate next scheduled attempt
			const newIntervalInMs = newInterval * MS_PER_DAY;
			const nextScheduledAttempt = new Date(new Date(attempt.dateTime).getTime() + newIntervalInMs);
			const newAttempts = [...previousMastery.attempts, attempt];

			// mastery is calculated by
			// 1. get the average success rate over the last 10 attempts
			// 2. multiplying by 100
			// 3. dividing by ((1/30)n + 1) where n is the number of days since the last attempt
			// the idea being, if you haven't attempted a question in a while, you should be less confident in your ability to answer it
			const last10Attempts = newAttempts
				.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
				.slice(0, 10);
			const averageSuccessRate =
				last10Attempts.length > 0
					? last10Attempts.reduce((acc, attempt) => acc + (attempt.success ? 1 : 0), 0) /
					  last10Attempts.length
					: 0;
			const daysSinceLastAttempt =
				(new Date().getTime() - new Date(last10Attempts[0].dateTime).getTime()) / MS_PER_DAY;
			// mastery is divided by two every 30 days
			const newMastery = Math.round(
				(averageSuccessRate * 100) / ((1 / 30) * daysSinceLastAttempt + 1)
			);

			// save mastery
			await locals.pb.collection('mastery').update(previousMastery.id, {
				ease: Math.floor(newEase * 100) / 100,
				interval: Math.floor(newInterval * 100) / 100,
				nextScheduledAttempt,
				attempts: newAttempts,
				mastery: newMastery
			});
		}

		throw redirect(303, '/');
	}
};
