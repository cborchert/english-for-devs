import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	// load exercise data

	const { slug } = params;

	// TODO: add chaoter types
	const [exercise] = await locals.pb.collection('chapters').getFullList(200, {
		filter: `slug = "${slug}"`,
		expand: 'questions'
	});

	// TODO: add progress types
	const progress = await locals.pb.collection('progress').getFullList(200, {
		filter: `user.id = "${locals.pb?.authStore?.model?.id}"`
	});

	const completedQuestionIds =
		progress.filter((item: any) => item.chapter === exercise?.id)?.[0]?.completedQuestions || [];
	const incompleteQuestionIds =
		exercise.questions?.filter((questionId: any) => !completedQuestionIds.includes(questionId)) ||
		[];
	const incompleteQuestions =
		exercise.expand?.questions?.filter((question: any) =>
			incompleteQuestionIds.includes(question.id)
		) || [];
	const nextQuestions = incompleteQuestions.slice(0, 10).map((question: any) => ({
		questionType: question.questionType,
		title: question.title,
		question: question.question,
		options: question.options,
		answers: question.answers,
		// TODO: add to question record
		keepOrder: false,
		responseCaseSensitive: false,
		exactResponseOnly: false
	}));

	return {
		questions: nextQuestions
	};
}) satisfies PageServerLoad;
