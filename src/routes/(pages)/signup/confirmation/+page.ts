import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	return { email: url.searchParams.get('email') };
}) satisfies PageLoad;
