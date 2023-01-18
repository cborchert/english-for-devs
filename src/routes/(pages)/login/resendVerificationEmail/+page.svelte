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

<div class="resendVerificationEmail">
	<Container size="sm">
		<Card>
			<h1 class="h3"><AccentText>Renvoyer l'email de confirmation</AccentText></h1>
			<form action="?/sendVerificationEmail" method="POST">
				<Input label="adresse mail" type="email" name="email" placeholder="adresse mail" />

				<Button type="submit">Envoyer</Button>
			</form>
			{#if form?.success}
				<div class="notification">
					<Notification type="success"
						>Un email de confirmation a été envoyé à votre adresse email.</Notification
					>
				</div>
			{/if}
		</Card>
	</Container>
</div>

<style>
	.resendVerificationEmail {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.notification {
		margin-top: var(--space-lg);
	}
</style>
