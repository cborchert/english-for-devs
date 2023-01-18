<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="signup">
	<Container size="sm">
		<Card>
			{#if !data.user}
				<h1><AccentText>Inscription</AccentText></h1>
				<form action="?/register" method="POST" use:enhance>
					<Input
						label="adresse mail"
						type="email"
						name="email"
						placeholder="adresse mail"
						error={form?.errors?.email?.[0]}
					/>
					<Input
						label="mot de passe"
						type="password"
						name="password"
						placeholder="mot de passe"
						error={form?.errors?.password?.[0]}
					/>
					<Input
						label="mot de passe (confirmation)"
						type="password"
						name="passwordConfirm"
						placeholder="mot de passe"
						error={form?.errors?.passwordConfirm?.[0]}
					/>
					<p>Vous avez déjà un compte ? <a href="/login">Connectez-vous</a></p>
					<Button type="submit">Submit</Button>
				</form>
			{:else}
				<Notification type="error">Vous êtes déjà connecté(e)</Notification>
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
	.signup {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.generalErrorMessage {
		margin-top: var(--space-lg);
	}
</style>
