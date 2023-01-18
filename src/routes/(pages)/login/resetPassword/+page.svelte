<script lang="ts">
	import type { ActionData } from './$types';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';

	export let form: ActionData;
</script>

<div class="resetPassword">
	<Container size="sm">
		<Card>
			<h1 class="h3"><AccentText>Réinitialisez votre mot de passe</AccentText></h1>
			<form action="?/resetPassword" method="POST">
				<Input label="adresse mail" type="email" name="email" placeholder="adresse mail" />

				<Button type="submit">Réinitialiser</Button>
			</form>
			{#if form?.success}
				<div class="notification">
					<Notification type="success"
						>Un email de réinitialisation a été envoyé à votre adresse email.</Notification
					>
				</div>
			{/if}
		</Card>
	</Container>
</div>

<style>
	.resetPassword {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.notification {
		margin-top: var(--space-lg);
	}
</style>
