<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	export let options: Array<{ value: string; text: any }> = [];
	export let randomize: boolean = true;
	export let value: string | undefined = undefined;
	export let disabled: boolean = false;

	let displayOptions = options;
	$: {
		if (randomize) {
			displayOptions = options.sort(() => Math.random() - 0.5);
		} else {
			displayOptions = options;
		}
	}

	function setValue(newValue?: string) {
		value = newValue;
	}
</script>

<Container>
	<p class="h3">
		<slot name="question" />
	</p>
	{#each displayOptions as { value: optionValue, text }}
		<Card
			on:click={() => {
				if (!disabled) setValue(optionValue === value ? undefined : optionValue);
			}}
			variant={optionValue === value ? 'light' : undefined}
			asButton
		>
			{text}
		</Card>
	{/each}
</Container>
