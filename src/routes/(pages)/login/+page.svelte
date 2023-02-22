<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="login">
	<Container size="sm">
		<Card>
			{#if !data.user}
				<h1><AccentText>Connexion</AccentText></h1>
				<p>Vous n'avez pas de compte ? <a href="/signup">Inscrivez-vous</a>.</p>
				<form action="?/login" method="POST" use:enhance>
					<Input
						label="adresse mail"
						type="email"
						name="email"
						placeholder="adresse mail"
						error={form?.errors?.email?.[0]}
					/>
					<Input
						label="mot de passe"
						type={'password'}
						name="password"
						placeholder="mot de passe"
						error={form?.errors?.password?.[0]}
					/>
					<p>
						Mot de passe oublié ? <a href="/login/reset-password"
							>Reinitialisez votre mot de passe</a
						>.
					</p>
					<Button type="submit">Connexion</Button>
				</form>
				{#if form?.unverifiedAccount}
					<Notification type="error">
						Votre compte n'a pas encore été vérifié. Veuillez vérifier votre boîte mail. <a
							href="/login/resend-verification-email"
							class="is-color-text">Renvoyer l'email de vérification</a
						>
					</Notification>
				{/if}
			{:else}
				<h3><AccentText>Vous êtes connecté(e)</AccentText></h3>
				<p>Vous êtes actuellement connecté(e) avec l'adresse mail : {data.user.email}</p>
				<form action="?/logout" method="POST">
					<Button type="submit">Déconnexion</Button>
				</form>
			{/if}
			{#if form?.generalErrorMessage}
				<div class="generalErrorMessage">
					<Notification type="error">{form.generalErrorMessage}</Notification>
				</div>
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
	.generalErrorMessage {
		margin-top: var(--space-lg);
	}
</style>
