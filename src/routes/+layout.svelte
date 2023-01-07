<script>
	import '$lib/styles/globals.scss';
</script>

<header />
<main>
	<slot />
</main>
<footer />

<style>
	main {
		margin: 0 auto;
		max-width: var(--width-xl);
		width: 100%;
		padding: var(--space-lg) var(--space);
	}
</style>
