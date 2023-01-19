<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import NewQuestionForm from '$lib/components/molecules/forms/NewQuestionForm.svelte';

	let modalVisible: boolean = false;
</script>

<Container>
	<h1>Admin</h1>
	<Button variant="ghost" size="small" on:click={() => (modalVisible = true)}>New Question</Button>
	{#if modalVisible}
		<Modal
			on:close={() => {
				modalVisible = false;
			}}
			title="New Question"
		>
			<NewQuestionForm />
		</Modal>
	{/if}
</Container>
