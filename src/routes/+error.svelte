<script>
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
</script>

<div class="ErrorPage">
	<Container size="sm">
		<Card>
			<div class="content">
				<h1>Oups !</h1>
				<p>Nous avons rencontré une erreur. <a href="/">Retournez à la page d'accueil.</a></p>
			</div>
		</Card>
	</Container>
</div>

<style>
	.ErrorPage {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: center;
	}
	.content {
		text-align: center;
	}
</style>
