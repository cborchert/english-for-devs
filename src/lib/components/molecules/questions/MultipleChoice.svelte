<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	export let options: string[] = [];
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
	{#each displayOptions as option}
		<Card
			on:click={() => {
				if (!disabled) setValue(option === value ? undefined : option);
			}}
			variant={option === value ? 'light' : undefined}
			asButton
		>
			{option}
		</Card>
	{/each}
</Container>
