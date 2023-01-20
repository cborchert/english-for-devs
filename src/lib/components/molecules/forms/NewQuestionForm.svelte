<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { enhance } from '$app/forms';

	import { checkResponse, QUESTION_TYPES } from '$lib/scripts/questions';

	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Select from '$lib/components/atoms/Select.svelte';
	import Notification from '$lib/components/atoms/Notification.svelte';
	import Question from '$lib/components/molecules/questions/Question.svelte';

	let lastOptionId = 1;
	let shouldFocusOnOption: number | void;
	let options = [{ id: lastOptionId, value: '' }];
	const addOption = (i: number) => {
		options = [
			...options.slice(0, i + 1),
			{ id: lastOptionId + 1, value: '' },
			...options.slice(i + 1)
		];
		lastOptionId++;
		shouldFocusOnOption = lastOptionId;
	};
	const deleteOption = (id: number) => {
		const i = options.findIndex((option) => option.id === id);
		const nextId = options[i - 1]?.id;
		options = options.filter((option) => option.id !== id);
		shouldFocusOnOption = nextId || options[0]?.id;
	};

	let lastAnswerId = 1;
	let shouldFocusOnAnswer: number | void;
	let answers = [{ id: lastAnswerId, value: '' }];
	const addAnswer = (i: number) => {
		answers = [
			...answers.slice(0, i + 1),
			{ id: lastAnswerId + 1, value: '' },
			...answers.slice(i + 1)
		];
		lastAnswerId++;
		shouldFocusOnAnswer = lastAnswerId;
	};
	const deleteAnswer = (id: number) => {
		const i = answers.findIndex((answer) => answer.id === id);
		const nextId = answers[i - 1]?.id;
		answers = answers.filter((answer) => answer.id !== id);
		shouldFocusOnAnswer = nextId || answers[0]?.id;
	};

	const togglePreview = () => {
		isPreview = !isPreview;
	};

	let questionType = QUESTION_TYPES.MULTIPLE_CHOICE;
	let isPreview = false;

	let title = '';
	let questionContent = '';
	let answer = '';
	$: answerCorrect = checkResponse(
		answer,
		answers.map((a) => a.value),
		false,
		false
	);

	const focusOn = (groupName: string, id: number) => {
		const input: HTMLInputElement | HTMLTextAreaElement | null = document.querySelector(
			`[name="${groupName}[${id}]"]`
		);
		if (input) input.focus();
	};

	const focusOnOption = (id: number) => focusOn('options', id);
	const focusOnAnswer = (id: number) => focusOn('answers', id);

	// TODO: eventually handle this in the input component and assign a dispatch of "previous" and "next"
	const handleOptionKeydown = (i: number) => (event: any) => {
		const id = options[i].id;
		if (event.key === 'Enter') {
			event.preventDefault();
			addOption(i);
		} else if (event.key === 'Backspace' && event.target?.value === '') {
			// if the user presses backspace and the input is empty, delete the option
			event.preventDefault();
			deleteOption(id);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			focusOnOption(options[i - 1]?.id);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			focusOnOption(options[i + 1]?.id);
		}
	};

	// TODO: eventually handle this in the input component and assign a dispatch of "previous" and "next"
	const handleAnswerKeydown = (i: number) => (event: any) => {
		const id = answers[i].id;
		if (event.key === 'Enter' && event.metaKey) {
			event.preventDefault();
			addAnswer(i);
		} else if (event.key === 'Backspace' && event.target?.value === '') {
			// if the user presses backspace and the input is empty, delete the answer
			event.preventDefault();
			deleteAnswer(id);
		} else if (event.key === 'ArrowUp' && (event.metaKey || event.target?.selectionStart === 0)) {
			event.preventDefault();
			focusOnAnswer(answers[i - 1]?.id);
		} else if (
			event.key === 'ArrowDown' &&
			(event.metaKey || event.target?.selectionStart === event.target?.value.length)
		) {
			event.preventDefault();
			focusOnAnswer(answers[i + 1]?.id);
		}
	};

	afterUpdate(() => {
		if (typeof shouldFocusOnOption !== 'undefined') {
			focusOnOption(shouldFocusOnOption);
			shouldFocusOnOption = undefined;
		} else if (typeof shouldFocusOnAnswer !== 'undefined') {
			focusOnAnswer(shouldFocusOnAnswer);
			shouldFocusOnAnswer = undefined;
		}
	});

	let formState: 'init' | 'loading' | 'error' | 'success' = 'init';
	let formMessage = '';

	const enhanceForm = () => {
		formState = 'loading';
		return async ({ result, update }: { result: any; update: () => any }) => {
			isPreview = false;
			if (result.type === 'success') {
				formState = 'success';
				update();
				title = '';
				questionContent = '';
				lastAnswerId++;
				lastOptionId++;
				options = [{ id: lastOptionId, value: '' }];
				answers = [{ id: lastAnswerId, value: '' }];
				questionType = QUESTION_TYPES.MULTIPLE_CHOICE;
			} else {
				formState = 'error';
			}
			formMessage = result.data?.message;
		};
	};
</script>

{#if formState === 'error' || formState === 'success'}
	<div class="result">
		<div class="resultMessage {formState}">
			{formMessage}
		</div>
		<Button on:click={() => (formState = 'init')}>
			{formState === 'error' ? 'Edit the question' : 'Create another question'}
		</Button>
	</div>
{:else if formState === 'loading'}
	<div>Loading</div>
{:else}
	<form method="POST" action="/admin?/createQuestion" use:enhance={enhanceForm}>
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
						{#each options as option, i}
							{#key option.id}
								<div class="option">
									<div class="optionInput">
										<Input
											style="flex: 1;"
											name="options[{option.id}]"
											noMargin
											bind:value={option.value}
											on:keydown={handleOptionKeydown(i)}
										/>
									</div>
									<Button
										variant="error"
										size="small"
										type="button"
										on:click={() => deleteOption(option.id)}>Delete</Button
									>
								</div>
							{/key}
						{/each}
					</div>
					<Button
						size="small"
						variant="ghost"
						type="button"
						on:click={() => addOption(options.length)}>Add Option</Button
					>
				</div>
			{/if}
			<div class="answers">
				<p class="no-margin">Accepted Answers</p>
				<div class="allAnswers">
					{#each answers as answer, i}
						{#key answer.id}
							<div class="answer">
								<div class="answerInput">
									<Input
										style="flex: 1; height: 90px; min-height: 90px; resize: vertical;"
										name="answers[{answer.id}]"
										noMargin
										type="textarea"
										bind:value={answer.value}
										on:keydown={handleAnswerKeydown(i)}
									/>
								</div>
								<Button
									variant="error"
									size="small"
									type="button"
									on:click={() => deleteAnswer(answer.id)}>Delete</Button
								>
							</div>
						{/key}
					{/each}
				</div>
				<Button
					size="small"
					variant="ghost"
					type="button"
					on:click={() => addAnswer(answers.length)}>Add Answer</Button
				>
			</div>
		</div>
		<div class:hidden={!isPreview}>
			<Question
				question={{
					title,
					question: questionContent,
					questionType,
					options: options.map((a) => a.value),
					answers: answers.map((a) => a.value)
				}}
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
{/if}

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
	.result {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: var(--space-xl) auto;
	}
	.resultMessage {
		font-size: var(--font-size-lg);
		margin-bottom: var(--space-lg);
		&.success {
			color: var(--color-success);
		}
		&.error {
			color: var(--color-error);
		}
	}
</style>
