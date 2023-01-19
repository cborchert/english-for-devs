<script lang="ts">
	import type { PageData } from './$types';

	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Select from '$lib/components/atoms/Select.svelte';

	let modalVisible = true;

	let options = [''];
	const addOption = () => {
		options = [...options, ''];
	};
	const deleteOption = (index: number) => {
		options = options.filter((_, i) => i !== index);
	};

	let answers = [''];
	const addAnswer = () => {
		answers = [...answers, ''];
	};
	const deleteAnswer = (index: number) => {
		answers = answers.filter((_, i) => i !== index);
	};
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
			<Input name="title" label="Title" />
			<Select
				name="questionType"
				label="Question Type"
				options={[
					{ value: '', label: 'Select a Question Type' },
					{ value: 'multiple-choice', label: 'Multiple Choice' },
					{ value: 'free-response', label: 'Free Response' },
					{ value: 'assisted-response', label: 'Assisted Input Response' }
				]}
			/>
			<div class="options">
				<p class="no-margin">Options</p>
				<div class="allOptions">
					{#each options as option, i}
						<div class="option">
							<div class="optionInput">
								<Input style="flex: 1;" name="options[]" noMargin />
							</div>
							<Button variant="error" on:click={() => deleteOption(i)}>Delete</Button>
						</div>
					{/each}
				</div>
				<Button size="small" on:click={addOption}>Add Option</Button>
			</div>
			<MarkdownEditor name="content" label="Question" size={200} />
			<div class="answers">
				<p class="no-margin">Answers</p>
				<div class="allAnswers">
					{#each answers as answer, i}
						<div class="answer">
							<div class="answerInput">
								<Input style="flex: 1;" name="answers[]" noMargin type="textarea" />
							</div>
							<Button variant="error" on:click={() => deleteAnswer(i)}>Delete</Button>
						</div>
					{/each}
				</div>
				<Button size="small" on:click={addAnswer}>Add Answer</Button>
			</div>
		</Modal>
	{/if}
</Container>

<style lang="scss">
	.options {
		margin-bottom: var(--space);
	}
	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space);
	}
	.optionInput {
		flex: 1;
	}
</style>
