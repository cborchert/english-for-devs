<script lang="ts">
	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Select from '$lib/components/atoms/Select.svelte';
	import { checkResponse, QUESTION_TYPES } from '$lib/scripts/questions';
	import Question from '../questions/Question.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';
	import { afterUpdate } from 'svelte';

	let numberOfOptions = 1;
	let shouldFocusOnOption: number | void;
	const addOption = (i: number) => {
		numberOfOptions++;
		shouldFocusOnOption = numberOfOptions - 1;
	};
	const deleteOption = (i: number) => {
		numberOfOptions--;
		shouldFocusOnOption = numberOfOptions ? numberOfOptions - 1 : undefined;
	};

	let numberOfAnswers = 1;
	let shouldFocusOnAnswer: number | void;
	const addAnswer = (i: number) => {
		numberOfAnswers++;
		shouldFocusOnAnswer = numberOfAnswers - 1;
	};
	const deleteAnswer = (i: number) => {
		numberOfAnswers--;
		shouldFocusOnAnswer = numberOfAnswers ? numberOfAnswers - 1 : undefined;
	};

	let form: HTMLFormElement;
	let answers: string[] = [];
	let options: string[] = [];
	const togglePreview = () => {
		const formData = new FormData(form);
		options = [];
		answers = [];
		for (let i = 0; i < numberOfOptions; i++) {
			const current = formData.get(`options[${i}]`);
			if (typeof current === 'string') options.push(current);
		}
		for (let i = 0; i < numberOfAnswers; i++) {
			const current = formData.get(`answers[${i}]`);
			if (typeof current === 'string') answers.push(current);
		}
		isPreview = !isPreview;
	};

	let questionType = QUESTION_TYPES.MULTIPLE_CHOICE;
	let isPreview = false;

	let title = '';
	let questionContent = '';
	let answer = '';
	$: answerCorrect = checkResponse(answer, answers, false, false);

	const handleOptionKeypress = (i: number) => (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			addOption(i);
		}
		// if the user presses backspace and the input is empty, delete the option
		else if (event.key === 'Backspace' && event.target?.value === '') {
			event.preventDefault();
			deleteOption(i);
		}
		// if the user presses cmd + backpace delete the option
		else if (event.key === 'Backspace' && event.metaKey) {
			event.preventDefault();
			deleteOption(i);
		}
	};

	afterUpdate(() => {
		if (typeof shouldFocusOnOption !== 'undefined') {
			const input: HTMLInputElement | null = document.querySelector(
				`input[name="options[${shouldFocusOnOption}]"]`
			);
			if (input) input.focus();
			shouldFocusOnOption = undefined;
		} else if (typeof shouldFocusOnAnswer !== 'undefined') {
			const input: HTMLTextAreaElement | null = document.querySelector(
				`textarea[name="answers[${shouldFocusOnAnswer}]"]`
			);
			if (input) input.focus();
			shouldFocusOnAnswer = undefined;
		}
	});
</script>

<form method="POST" action="/admin?/createQuestion" bind:this={form}>
	<div class:hidden={isPreview}>
		<Input name="title" label="Title" placeholder="Optional" bind:value={title} />
		<MarkdownEditor name="question" label="Question" size={200} bind:value={questionContent} />
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
					{#each Array(numberOfOptions) as _, i}
						<div class="option">
							<div class="optionInput">
								<Input
									style="flex: 1;"
									name="options[{i}]"
									noMargin
									on:keypress={handleOptionKeypress(i)}
								/>
							</div>
							<Button variant="error" size="small" type="button" on:click={() => deleteOption(i)}
								>Delete</Button
							>
						</div>
					{/each}
				</div>
				<Button
					size="small"
					variant="ghost"
					type="button"
					on:click={() => addOption(numberOfOptions)}>Add Option</Button
				>
			</div>
		{/if}
		<div class="answers">
			<p class="no-margin">Accepted Answers</p>
			<div class="allAnswers">
				{#each Array(numberOfAnswers) as _, i}
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
			<Button size="small" variant="ghost" type="button" on:click={() => addAnswer(numberOfAnswers)}
				>Add Answer</Button
			>
		</div>
	</div>
	<div class:hidden={!isPreview}>
		<Question
			question={{ title, question: questionContent, questionType, options, answers }}
			bind:value={answer}
		/>
		<Notification type={answerCorrect ? 'success' : 'error'}
			>{answerCorrect ? 'Correct' : 'Incorrect'}</Notification
		>
	</div>
	<div class="footer">
		<Button variant="secondary" type="button" on:click={togglePreview}
			>{isPreview ? 'Edit' : 'Preview'}</Button
		>
		<Button type="submit">Save Question</Button>
	</div>
</form>

<style lang="scss">
	.hidden {
		display: none;
	}
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
		justify-content: space-between;
	}
</style>
