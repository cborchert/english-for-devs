import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// logged in users are redirected to the app
	if (!locals.user) {
		throw redirect(303, '/');
	}

	return {};
}) satisfies LayoutServerLoad;
