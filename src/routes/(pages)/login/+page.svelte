<script lang="ts">
	import type { KeyboardEventHandler } from 'svelte/elements';
	import { currentUser, login, logout } from '$lib/scripts/db/client';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Input from '$lib/components/atoms/Input.svelte';

	let userName = '';
	let password = '';
	let passwordVisible = false;

	const handleSubmit = () => login(userName, password);
</script>

<div class="login">
	<Container size="sm">
		<Card>
			{#if !$currentUser}
				<h1><AccentText>Login</AccentText></h1>
				<form on:submit|preventDefault={handleSubmit}>
					<Input
						label="adresse mail"
						type="email"
						name="email"
						placeholder="adresse mail"
						bind:value={userName}
						on:input={console.log}
					/>
					<Input
						label="mot de passe"
						type={passwordVisible ? 'text' : 'password'}
						name="password"
						placeholder="mot de passe"
						bind:value={password}
					/>
					<Button type="submit">Submit</Button>
					<p>Vous n'avez pas de compte ? <a href="/signup">Inscrivez-vous</a>.</p>
				</form>
			{:else}
				<h3><AccentText>Vous êtes connecté(e)</AccentText></h3>
				<p>email: {$currentUser.email}</p>
				<Button on:click={logout}>Signout</Button>
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
