<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
</script>

<Container>
	<Card>
		<h1><mark>Anglais pour les Devs</mark></h1>
		<h2 class="h3">
			Un cours d'<mark>anglais</mark> spécialisé pour les personnes dans l'informatique.
		</h2>
		<p>
			Travailler dans un contexte anglophone demande plus qu'une simple connaissance de l'anglais.
			Il faut être capable de s'exprimer dans un contexte professionnel avec un vocabulaire précis
			et de comprendre des informations techniques. C'est pourquoi nous avons créé
			<mark>Anglais pour les Devs</mark>.
		</p>
		<div>
			<Button variant="primary" size="large" href="/signup">Commencer</Button>
		</div>
	</Card>
</Container>

<style lang="scss">
	p {
		font-size: var(--font-size-lg);
		margin: var(--space-lg) 0 var(--space-xl);
	}
</style>
