import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const audioEnabled: Writable<boolean> = writable(
	browser && (localStorage.getItem('audioEnabled') || 'true') === 'true'
);

audioEnabled.subscribe((val) => {
	if (browser) localStorage.setItem('audioEnabled', val.toString());
});

export const toggleAudio = () => {
	audioEnabled.update((val) => !val);
};
