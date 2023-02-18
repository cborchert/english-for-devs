<script lang="ts">
	import IconAudioEnabled from '~icons/ph/speaker-high';
	import IconAudioDisabled from '~icons/ph/speaker-slash';
	import { audioEnabled, toggleAudio } from '$lib/stores/audioStore';
</script>

<button on:click={toggleAudio}>
	{#if $audioEnabled}
		<IconAudioEnabled />
	{:else}
		<IconAudioDisabled />
	{/if}
</button>

<style lang="scss">
	button {
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		text-align: center;
		color: var(--color-text);
		opacity: 0.8;
		display: inline-grid;
		place-items: center;

		&:hover {
			opacity: 1;
		}
	}
</style>
