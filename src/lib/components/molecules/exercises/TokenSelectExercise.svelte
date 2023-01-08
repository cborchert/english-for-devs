<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import { onMount } from 'svelte';

	export let tokens: Array<string> = [];
	export let randomize: boolean = true;
	export let value: string | undefined = undefined;
	export let disabled: boolean = false;

	let displayTokens: Array<{ text: string; id: number }> = [];

	onMount(() => {
		if (randomize) {
			displayTokens = tokens
				.sort(() => Math.random() - 0.5)
				.map((token, id) => ({
					text: token,
					id
				}));
		} else {
			displayTokens = tokens.map((token, id) => ({
				text: token,
				id
			}));
		}
	});

	let selectedTokens: Array<{ text: string; id: number }> = [];

	$: value = selectedTokens.map((t) => t.text).join(' ');

	function toggleToken(token: { text: string; id: number }) {
		if (!disabled) {
			if (selectedTokens.some((t) => t.id === token.id)) {
				selectedTokens = selectedTokens.filter((t) => t.id !== token.id);
			} else {
				selectedTokens = [...selectedTokens, token];
			}
		}
	}
</script>

<Container>
	<p class="h3">
		<slot name="question" />
	</p>
	<p class="selected">
		{#each selectedTokens as { text, id }}
			<Button
				on:click={() => toggleToken({ text, id })}
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
		{#each displayTokens as { text, id }}
			<Button
				on:click={() => {
					toggleToken({ text, id });
				}}
				asButton
				size="small"
				variant="ghost"
				disabled={disabled || selectedTokens.some((t) => t.id === id)}
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
