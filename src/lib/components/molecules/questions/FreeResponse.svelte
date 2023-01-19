<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';

	export let value: string | undefined = undefined;
	export let disabled: boolean = false;
</script>

<Container>
	<p class="h3">
		<slot name="question" />
	</p>
	<textarea bind:value {disabled} />
</Container>
