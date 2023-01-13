import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

if (!import.meta.env.VITE_POCKETBASE_URL) {
	throw new Error('VITE_POCKETBASE_URL is not defined');
}

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

export const login = async (email: string, password: string): Promise<boolean> => {
	try {
		await pb.collection('users').authWithPassword(email, password);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const signUp = async (
	email: string,
	password: string,
	passwordConfirm: string
): Promise<boolean> => {
	try {
		const data = {
			email,
			password,
			passwordConfirm,
			username: email.replace('@', '_at_')
		};
		await pb.collection('users').create(data);
		await login(email, password);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const logout = () => pb.authStore.clear();

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});
