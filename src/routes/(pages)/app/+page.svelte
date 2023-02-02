<script lang="ts">
	import type { PageData } from './$types';

	import Container from '$lib/components/atoms/Container.svelte';
	import Module from '$lib/components/molecules/Module.svelte';

	export let data: PageData;

	const { course } = data;
	const modules = course?.modules || [];
</script>

<Container size="sm">
	<h2>Welcome back!</h2>
	{#each modules as module}
		<Module {...module} />
	{/each}
</Container>
