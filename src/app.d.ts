/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		// TODO: type this properly using the PocketBase types
		user: any;
		// TODO: type this properly using the PocketBase types
		pb: any;
	}
	// interface PageData {}
	// interface Platform {}
}

declare type ContainerSize = 'sm' | 'md' | 'lg';

declare type Attempt = {
	questionId: string;
	answer: string | undefined;
	success: boolean;
	dateTime: string;
	timeTakenInMs: number;
};
