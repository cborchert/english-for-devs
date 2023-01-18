import { redirect, fail } from '@sveltejs/kit';
import { z } from 'zod';

import type { Actions } from './$types';

import forms from '$lib/translations/forms.json';

const loginSchema = z.object({
	email: z.string({ required_error: forms.required }).email({ message: forms.invalidEmail }),
	password: z.string({ required_error: forms.required }).min(1, { message: forms.required })
});

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			// validate the form data
			const validatedBody = loginSchema.safeParse(body);
			if (!validatedBody.success) {
				const { fieldErrors: errors } = validatedBody.error.flatten();
				const { password, ...bodyData } = body;
				console.log({ errors });
				return fail(400, {
					data: bodyData,
					errors
				});
			}

			await locals.authClient
				.collection('users')
				.authWithPassword(validatedBody.data.email, validatedBody.data.password);

			// if the user is not verified, clear the authStore, logging them out
			if (!locals.authClient.authStore.model.verified) {
				locals.authClient.authStore.clear();
				return {
					unverifiedAccount: true
				};
			}
		} catch (err) {
			console.error(err);
			return fail(400, {
				generalErrorMessage: forms.loginError
			});
		}
		throw redirect(303, '/');
	},
	logout: async ({ locals }) => {
		locals.authClient.authStore.clear();
		throw redirect(303, '/login');
	}
};
