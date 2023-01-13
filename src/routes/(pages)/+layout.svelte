<script>
	import Container from '$lib/components/atoms/Container.svelte';
</script>

<div class="page">
	<header />
	<main>
		<slot />
	</main>
	<footer />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
