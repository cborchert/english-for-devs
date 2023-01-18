import type { Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.authClient.collection('users').create(body);
			await locals.authClient.collection('users').requestVerification(body.email);
		} catch (err) {
			console.error(err);
			throw error(500, 'Error creating user');
		}
		throw redirect(303, '/signup/confirmation?email=' + body.email);
	}
};
