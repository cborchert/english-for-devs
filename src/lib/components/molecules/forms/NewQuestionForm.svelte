<script lang="ts">
	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Select from '$lib/components/atoms/Select.svelte';
	import { QUESTION_TYPES } from '$lib/scripts/questions';

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

	let questionType = QUESTION_TYPES.MULTIPLE_CHOICE;
</script>

<form method="POST" action="/admin?/createQuestion">
	<Input name="title" label="Title" placeholder="Optional" />
	<MarkdownEditor name="question" label="Question" size={200} />
	<Select
		name="questionType"
		label="Question Type"
		options={[
			{ value: QUESTION_TYPES.MULTIPLE_CHOICE, label: 'Multiple Choice' },
			{ value: QUESTION_TYPES.FREE_RESPONSE, label: 'Free Response' },
			{ value: QUESTION_TYPES.ASSISTED_RESPONSE, label: 'Assisted Input Response' }
		]}
		bind:value={questionType}
	/>
	{#if [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.ASSISTED_RESPONSE].includes(questionType)}
		<div class="options">
			<p class="no-margin">Options</p>
			<div class="allOptions">
				{#each options as option, i}
					<div class="option">
						<div class="optionInput">
							<Input style="flex: 1;" name="options[{i}]" noMargin />
						</div>
						<Button variant="error" size="small" type="button" on:click={() => deleteOption(i)}
							>Delete</Button
						>
					</div>
				{/each}
			</div>
			<Button size="small" variant="ghost" type="button" on:click={addOption}>Add Option</Button>
		</div>
	{/if}
	<div class="answers">
		<p class="no-margin">Accepted Answers</p>
		<div class="allAnswers">
			{#each answers as answer, i}
				<div class="answer">
					<div class="answerInput">
						<Input
							style="flex: 1; height: 90px; min-height: 90px; resize: vertical;"
							name="answers[{i}]"
							noMargin
							type="textarea"
						/>
					</div>
					<Button variant="error" size="small" type="button" on:click={() => deleteAnswer(i)}
						>Delete</Button
					>
				</div>
			{/each}
		</div>
		<Button size="small" variant="ghost" type="button" on:click={addAnswer}>Add Answer</Button>
	</div>
	<div class="footer">
		<Button type="submit">Submit</Button>
	</div>
</form>

<style lang="scss">
	.options,
	.answers {
		margin-bottom: var(--space);
	}
	.option,
	.answer {
		display: flex;
		justify-content: space-between;
		align-items: top;
		margin-bottom: var(--space-sm);
	}
	.optionInput,
	.answerInput {
		flex: 1;
	}
	.footer {
		margin-top: var(--space-lg);
		display: flex;
	}
</style>
