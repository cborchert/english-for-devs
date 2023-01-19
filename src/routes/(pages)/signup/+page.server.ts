import { z } from 'zod';

import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

import forms from '$lib/translations/forms.json';
import interpolate from '$lib/scripts/interpolate';

const signupSchema = z
	.object({
		email: z.string({ required_error: forms.required }).email({ message: forms.invalidEmail }),
		password: z
			.string({ required_error: forms.required })
			.min(8, { message: interpolate(forms.passwordTooShort, { length: 8 }) }),
		passwordConfirm: z
			.string({ required_error: forms.required })
			.min(8, { message: interpolate(forms.passwordTooShort, { length: 8 }) })
	})
	.refine(({ password, passwordConfirm }) => password === passwordConfirm, {
		message: forms.passwordsDontMatch,
		path: ['passwordConfirm']
	});

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			// validate the form data
			const validatedBody = signupSchema.safeParse(body);
			if (!validatedBody.success) {
				const { fieldErrors: errors } = validatedBody.error.flatten();
				const { password, passwordConfirm, ...bodyData } = body;
				console.log({ errors });
				return fail(400, {
					data: bodyData,
					errors
				});
			}

			// create the user
			await locals.pb.collection('users').create(validatedBody.data);
			await locals.pb.collection('users').requestVerification(validatedBody.data.email);
		} catch (err) {
			console.error(err);
			return fail(400, {
				generalErrorMessage: forms.signupError
			});
		}
		throw redirect(303, '/signup/confirmation?email=' + body.email);
	}
};
