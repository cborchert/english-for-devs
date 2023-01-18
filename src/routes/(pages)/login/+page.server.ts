import { redirect, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.authClient.collection('users').authWithPassword(body.email, body.password);

			console.log(locals.authClient.authStore);

			// if the user is not verified, clear the authStore, logging them out
			if (!locals.authClient.authStore.model.verified) {
				locals.authClient.authStore.clear();
				return {
					unverifiedAccount: true
				};
			}
		} catch (err) {
			console.error(err);
			throw error(500, 'Error while logging in');
		}
		throw redirect(303, '/');
	},
	logout: async ({ locals }) => {
		locals.authClient.authStore.clear();
		throw redirect(303, '/login');
	}
};
