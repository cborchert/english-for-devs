<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import { onMount } from 'svelte';

	export let options: Array<string> = [];
	export let randomize: boolean = true;
	export let value: string | undefined = undefined;
	export let disabled: boolean = false;

	let displayOptions: Array<{ text: string; id: number }> = [];

	onMount(() => {
		if (randomize) {
			displayOptions = options
				.sort(() => Math.random() - 0.5)
				.map((option, id) => ({
					text: option,
					id
				}));
		} else {
			displayOptions = options.map((option, id) => ({
				text: option,
				id
			}));
		}
	});

	let selectedOptions: Array<{ text: string; id: number }> = [];

	$: value = selectedOptions.map((t) => t.text).join(' ');

	function toggleOption(option: { text: string; id: number }) {
		if (!disabled) {
			if (selectedOptions.some((t) => t.id === option.id)) {
				selectedOptions = selectedOptions.filter((t) => t.id !== option.id);
			} else {
				selectedOptions = [...selectedOptions, option];
			}
		}
	}
</script>

<Container>
	<p class="h3">
		<slot name="question" />
	</p>
	<p class="selected">
		{#each selectedOptions as { text, id }}
			<Button
				on:click={() => toggleOption({ text, id })}
				asButton
				size="small"
				variant="tertiary"
				{disabled}
			>
				{text}
			</Button>
		{/each}
	</p>
	<p>
		{#each displayOptions as { text, id }}
			<Button
				on:click={() => {
					toggleOption({ text, id });
				}}
				asButton
				size="small"
				variant="ghost"
				disabled={disabled || selectedOptions.some((t) => t.id === id)}
			>
				{text}
			</Button>
		{/each}
	</p>
</Container>

<style>
	.selected {
		min-height: 200px;
		background: var(--color-background-alt);
		padding: var(--space);
		margin-bottom: var(--space-lg);
	}
</style>
