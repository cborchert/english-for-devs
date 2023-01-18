<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	export let data: PageData;
</script>

<div class="confirmation">
	<Container size="sm">
		<Card>
			<h3><AccentText>Confirmer votre adresse email</AccentText></h3>
			<p>
				Merci beaucoup ! Nous avons envoyé un message a votre adresse email{data?.email
					? ` ${data.email}`
					: ''}. Veuillez cliquer sur le lien de confirmation pour activer votre compte.
			</p>
		</Card>
	</Container>
</div>

<style>
	.confirmation {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
