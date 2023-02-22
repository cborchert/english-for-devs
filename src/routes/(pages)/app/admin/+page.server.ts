import { serializeNonPOJO } from '$lib/scripts/utils';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// logged in users are redirected to the app
	if (!locals.user) {
		throw redirect(303, '/');
	}

	const records = await locals.pb.collection('questions').getFullList(200, {
		sort: '-created'
	});

	return { questions: serializeNonPOJO(records) };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createQuestion: async ({ locals, request }) => {
		const { title, question, questionType, ...restBody } = Object.fromEntries(
			await request.formData()
		);

		// get options and answers from form data
		const options = Object.entries(restBody)
			.filter(([key]) => key.startsWith('options['))
			.map(([, value]) => value)
			.filter((value) => !!value);
		const answers = Object.entries(restBody)
			.filter(([key]) => key.startsWith('answers['))
			.map(([, value]) => value)
			.filter((value) => !!value);

		const data = {
			title,
			question,
			questionType,
			options: options,
			answers: answers
		};
		try {
			const record = await locals.pb.collection('questions').create(data);
			if (!record) {
				throw new Error('Question not created');
			}
			return {
				message: 'Question created successfully',
				success: true
			};
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Error creating question' });
		}
	},
	exercisesFromJson: async ({ locals, request }) => {
		const { exercises: exercisesJson } = Object.fromEntries(await request.formData());
		try {
			if (typeof exercisesJson !== 'string') {
				throw new Error('Invalid JSON');
			}
			const exercises = JSON.parse(exercisesJson);
			for (const exercise of exercises) {
				const { questions = [], ...rest } = exercise;
				const questionIds = [];
				for (const question of questions) {
					const questionRecord = await locals.pb.collection('questions').create(question);
					if (questionRecord) {
						questionIds.push(questionRecord.id);
					}
				}
				await locals.pb.collection('chapters').create({
					...rest,
					questions: questionIds
				});
			}
			return {
				message: 'Questions created successfully',
				success: true
			};
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Error creating questions' });
		}
	}
};
