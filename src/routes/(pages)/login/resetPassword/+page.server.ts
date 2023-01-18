import type { Actions } from './$types';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.authClient.collection('users').requestPasswordReset(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.error(err);
			throw error(500, 'Error while resetting password');
		}
	}
};
