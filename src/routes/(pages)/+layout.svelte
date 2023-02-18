<script lang="ts">
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Transition from '$lib/components/atoms/Transition.svelte';

	export let data: PageData;
</script>

<div class="page">
	<header>
		<a href={data?.user ? '/app' : '/'} class="no-underline h5"
			><AccentText>&lt;Anglais /&gt;</AccentText></a
		>
		<nav>
			<li>
				<Button href="/login" size="small" variant="ghost"
					>{data?.user ? 'Déconnexion' : 'Connexion'}</Button
				>
			</li>
		</nav>
	</header>
	<main>
		<Transition url={$page.url.toString()}>
			<slot />
		</Transition>
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
