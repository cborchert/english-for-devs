<script lang="ts">
	import type { PageData } from './$types';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';

	export let data: PageData;
</script>

<div class="login">
	<Container size="sm">
		<Card>
			{#if !data.user}
				<h1><AccentText>Inscription</AccentText></h1>
				<form action="?/register" method="POST">
					<Input label="adresse mail" type="email" name="email" placeholder="adresse mail" />
					<Input label="mot de passe" type="password" name="password" placeholder="mot de passe" />
					<Input
						label="mot de passe (confirmation)"
						type="password"
						name="passwordConfirm"
						placeholder="mot de passe"
					/>
					<p>Vous avez déjà un compte ? <a href="/login">Connectez-vous</a></p>
					<Button type="submit">Submit</Button>
				</form>
			{:else}
				<Notification type="error">Vous êtes déjà connecté(e)</Notification>
			{/if}
		</Card>
	</Container>
</div>

<style>
	.login {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
