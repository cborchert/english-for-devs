<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import NewQuestionForm from '$lib/components/molecules/forms/NewQuestionForm.svelte';
	import QuestionsList from '$lib/components/molecules/QuestionsList.svelte';
	import Input from '$lib/components/atoms/Input.svelte';

	let modalVisible: boolean = false;
</script>

<Container>
	<h1>Admin</h1>
	<!-- <h3>Questions</h3>
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
	{/if} -->
	<h2>Mass Exercise creator</h2>
	<p>Enter exercises as JSON (must be an array)</p>
	<pre>{`
[
  {
    "published": true,
    "slug": "",
    "title": "",
    "description": "",
    "chapterType": "exercise",
    "content": "",
    "questions": [
      "published": true,
      "title": "",
      "question": "",
      "questionType": "multipleChoice" | "freeResponse" | "assistedResponse",
      "options": [
      
      ],
      "answers": [
      
      ]
    ]
  }
]`}
	</pre>
	<form action="?/exercisesFromJson" method="POST">
		<Input type="textarea" name="exercises" rows="10" cols="50" />
		<Button type="submit">Create</Button>
	</form>
</Container>
