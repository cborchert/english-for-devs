import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
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
			console.log(record);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Error creating question' });
		}
	}
};
