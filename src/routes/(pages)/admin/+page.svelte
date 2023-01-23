<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import NewQuestionForm from '$lib/components/molecules/forms/NewQuestionForm.svelte';
	import QuestionsList from '$lib/components/molecules/QuestionsList.svelte';

	let modalVisible: boolean = false;
</script>

<Container>
	<h1>Admin</h1>
	<h3>Questions</h3>
	<QuestionsList />
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
