<script lang="ts">
	import type { PageData } from './$types';

	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	export let data: PageData;
</script>

<div class="page">
	<header>
		<a href="/" class="no-underline h5"><AccentText>&lt;Anglais /&gt;</AccentText></a>
		<nav>
			<li>
				<Button href="/login" size="small" variant="ghost"
					>{data?.user ? 'Déconnexion' : 'Connexion'}</Button
				>
			</li>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer />
</div>

<style lang="scss">
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

	header {
		padding: var(--space) var(--space-lg);
		display: flex;
		justify-content: space-between;
		nav {
			display: flex;
			justify-content: flex-end;
			li {
				list-style: none;
				margin: 0 var(--space);
			}
		}
	}
</style>
