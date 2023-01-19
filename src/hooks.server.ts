import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';

import { serializeNonPOJO } from '$lib/scripts/utils';

export const handle = (async ({ event, resolve }) => {
	// load the auth client from the cookie
	event.locals.pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// if the user is logged in, serialize the user object and pass it forward
	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJO(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	// set the response cookie
	response.headers.set(
		'Set-Cookie',
		event.locals.pb.authStore.exportToCookie({
			// TODO : remove this before production or condition it on dev mode
			// !IMPORTANT: This is a security risk, but it's required for the demo to work on localhost without https
			secure: false
		})
	);

	return response;
}) satisfies Handle;
