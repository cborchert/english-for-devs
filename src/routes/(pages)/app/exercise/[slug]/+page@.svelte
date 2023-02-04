<script lang="ts">
	import IconCorrect from '~icons/ph/check';
	import IconError from '~icons/ph/x';
	import { scale } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	import { checkResponse } from '$lib/scripts/questions';

	import Card from '$lib/components/atoms/Card.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import ProgressBar from '$lib/components/atoms/ProgressBar.svelte';
	import Question from '$lib/components/molecules/questions/Question.svelte';
	import CloseButton from '$lib/components/atoms/CloseButton.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';

	export let data: PageData;

	const { exerciseId, questions: exerciseQuestions = [] } = data;

	// const exercises = [
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'Comment dit-on <mark>« réunion »</mark> ?',
	// 		options: ['Reunion', 'Date', 'Meeting'],
	// 		keepOrder: false,
	// 		answers: ['Meeting'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'What is the English word for <mark>« ordinateur »</mark> ?',
	// 		options: ['Computer', 'Keyboard', 'Mouse'],
	// 		keepOrder: false,
	// 		answers: ['Computer'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'How do you say <mark>« smartphone »</mark> in English?',
	// 		options: ['Cell phone', 'Smartphone', 'Landline'],
	// 		keepOrder: false,
	// 		answers: ['Smartphone'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'What is the English translation of <mark>« logiciel »</mark>?',
	// 		options: ['Hardware', 'Software', 'Operating system'],
	// 		keepOrder: false,
	// 		answers: ['Software'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'Comment dit-on <mark>« développeur »</mark> en anglais ?',
	// 		options: ['Developer', 'Designer', 'Project manager'],
	// 		keepOrder: false,
	// 		answers: ['Developer'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
	// 		question: 'What is the English word for <mark>« équipe »</mark> ?',
	// 		options: ['Team', 'Company', 'Organization'],
	// 		keepOrder: false,
	// 		answers: ['Team'],
	// 		responseCaseSensitive: false,
	// 		exactResponseOnly: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.FREE_RESPONSE,
	// 		question: 'Translate the following word into English: <mark>« fichier »</mark>',
	// 		answers: ['File'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.FREE_RESPONSE,
	// 		question: 'Translate the following phrase into English: <mark>« ouvrir un fichier »</mark>',
	// 		answers: ['Open a file'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.FREE_RESPONSE,
	// 		question: 'Translate the following word into English: <mark>« ordinateur portable »</mark>',
	// 		answers: ['Laptop'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.FREE_RESPONSE,
	// 		question: 'Translate the following word into English: <mark>« clavier »</mark>',
	// 		answers: ['Keyboard'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.FREE_RESPONSE,
	// 		question:
	// 			'Translate the following phrase into English: <mark>« sauvegarder un fichier »</mark>',
	// 		answers: ['Save a file'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
	// 		question:
	// 			'Translate the following sentence into English: <mark>« Je suis en train de télécharger un fichier »</mark>',
	// 		answers: ['I am downloading a file'],
	// 		options: [
	// 			'File',
	// 			'Am',
	// 			'You',
	// 			'I',
	// 			'Uploading',
	// 			'A',
	// 			'Computer',
	// 			'Were',
	// 			'Was',
	// 			'Downloading',
	// 			'The',
	// 			'Document',
	// 			'Are'
	// 		],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
	// 		question:
	// 			'Translate the following sentence into English: <mark>« Je suis développeur »</mark>',
	// 		answers: ['I am a developer'],
	// 		options: ['A', 'Developer', 'I', 'Am', 'An', 'Programmer', 'Engineer', 'Were', 'You', 'Was'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
	// 		question:
	// 			'Translate the following sentence into English: <mark>« Je suis en train de travailler sur mon ordinateur »</mark>',
	// 		answers: ['I am working on my computer'],
	// 		options: ['On', 'Working', 'I', 'Am', 'My', 'Computer', 'A', 'The', 'You', 'Were', 'Was'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	},
	// 	{
	// 		questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
	// 		question:
	// 			'Translate the following phrase into English: <mark>« enregistrer un fichier »</mark>',
	// 		answers: ['Save a file'],
	// 		options: ['File', 'A', 'Save', 'The', 'Document', 'Upload', 'Download', 'My', 'Your'],
	// 		exactResponseOnly: false,
	// 		responseCaseSensitive: false
	// 	}
	// ].sort(() => Math.random() - 0.5);

	const exercises = exerciseQuestions.sort(() => Math.random() - 0.5);

	$: stack = [...exercises];

	let score = 0;
	let questionsTaken = 0;
	let totalQuestions = exercises.length;
	let hasSubmitted = false;
	let answer: string | undefined = undefined;
	let answerIsCorrect: boolean = false;
	let isCloseModalShown: boolean = false;
	let startTime = Date.now();
	let additionalTime = 0;
	let attempts: Attempt[] = [];
	let done = false;

	$: percentComplete = totalQuestions ? Math.floor((score / totalQuestions) * 100) : 0;

	$: ({ answers, responseCaseSensitive, exactResponseOnly, questionType, options, question } =
		stack[0] || {});
	$: currentOptions = options?.sort(() => Math.random() - 0.5);

	/**
	 * When the user switches tabs, pause the timer
	 */
	function handleVisibilityChange() {
		if (document.hidden) {
			additionalTime += Date.now() - startTime;
		} else {
			startTime = Date.now();
		}
	}
	onMount(() => {
		document.addEventListener('visibilitychange', handleVisibilityChange, false);
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange, false);
		};
	});

	function respond(skip: boolean = false) {
		let endTime = Date.now();
		let timeTakenInMs = endTime - startTime + additionalTime;
		let questionId = stack[0].id;

		hasSubmitted = true;
		if (skip) {
			answer = undefined;
		}
		answerIsCorrect = checkResponse(answer, answers, responseCaseSensitive, exactResponseOnly);
		if (answerIsCorrect) {
			score++;
		}
		attempts = [
			...attempts,
			{
				questionId,
				answer,
				success: answerIsCorrect,
				dateTime: new Date().toString(),
				timeTakenInMs
			}
		];
	}

	function next() {
		questionsTaken++;
		// reorganize the stack
		const [currentQuestion, ...newStack] = stack;
		stack = newStack;
		if (!answerIsCorrect && currentQuestion) {
			stack = [...stack, currentQuestion];
		}

		// reset the state
		hasSubmitted = false;
		answer = undefined;
		answerIsCorrect = false;
		startTime = Date.now();
		done = score >= totalQuestions;
	}

	// if control/cmnd + enter is pressed, submit the answer; handled on mac and windows
	function handleKeydown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			if (hasSubmitted) {
				next();
			} else {
				respond();
			}
		}
	}

	function showCloseModal(isShown: boolean = true) {
		isCloseModalShown = isShown;
	}
</script>

<div class="quizExample" on:keydown={handleKeydown}>
	{#if !done}
		<header>
			<Container>
				<div class="headerInner">
					<CloseButton on:click={() => showCloseModal()} />
					<div class="headerProgress">
						<ProgressBar progress={percentComplete} variant="gradient" />
					</div>
				</div>
			</Container>
		</header>
		<main>
			{#key questionsTaken}
				<Question
					question={{ questionType, options: currentOptions, answers, question }}
					bind:value={answer}
					disabled={hasSubmitted}
				/>
			{/key}
		</main>
		<footer
			class:success={hasSubmitted && answerIsCorrect}
			class:error={hasSubmitted && !answerIsCorrect}
		>
			<Container>
				<div class="footer-inner">
					{#if hasSubmitted}
						<div
							class="responseRating"
							in:scale={{
								duration: 150,
								opacity: 1,
								start: 0.7,
								easing: cubicIn
							}}
						>
							{#if answerIsCorrect}
								<div>
									<div class="responseRatingIconContainer">
										<IconCorrect />
									</div>
								</div>
								<span><strong>Bravo !</strong></span>
							{:else}
								<div>
									<div class="responseRatingIconContainer responseRatingIconContainer_error">
										<IconError />
									</div>
								</div>
								<span>
									La bonne réponse était <strong>&laquo; {answers[0]} &raquo;</strong>
								</span>
							{/if}
						</div>
						<Button variant={answerIsCorrect ? 'success' : 'error'} on:click={next}
							>Continuer</Button
						>
					{:else}
						<Button on:click={() => respond(true)} variant="ghost">Passer</Button>
						<Button on:click={() => respond()} disabled={!answer}>Valider</Button>
					{/if}
				</div>
			</Container>
		</footer>
	{:else}
		<main>
			<Container>
				<Card>
					<form action="?/saveProgress" method="POST">
						<input type="hidden" name="attempts" value={JSON.stringify(attempts)} />
						<input type="hidden" name="exerciseId" value={exerciseId} />
						<p class="h1"><AccentText>Bravo !</AccentText></p>
						<p class="h4">
							Vous avez terminé l'exercice. Continuer pour sauvegarder votre progrès.
						</p>
						<Button type="submit">Continuer</Button>
					</form>
				</Card>
			</Container>
		</main>
	{/if}
</div>

{#if isCloseModalShown}
	<Modal on:close={() => showCloseModal(false)} title="Voulez-vous vraiment quitter ?" size="sm">
		<p class="modalBody">Tout votre progrès sera perdu</p>
		<div class="modalFooter">
			<Button on:click={() => showCloseModal(false)} variant="ghost">Annuler</Button>
			<Button href="/" variant="error">Quitter</Button>
		</div>
	</Modal>
{/if}

<style lang="scss">
	@use '$lib/styles/_breakpoints.scss' as *;

	.quizExample {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.responseRating {
		font-size: var(--font-size-lg);
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	header {
		position: sticky;
		top: 0;
		z-index: 1;
		background: var(--color-background);
	}

	.headerInner {
		display: flex;
		font-size: var(--font-size-lg);
		align-items: center;
	}

	.headerProgress {
		flex: 1;
		margin-left: var(--space-lg);
	}

	main {
		margin: var(--space-xl) 0;
		flex: 1;
	}

	footer {
		position: sticky;
		bottom: 0;
		width: 100%;
		background: var(--color-background-alt);
		border-top: 6px solid var(--color-background-alt);
		box-shadow: var(--box-shadow-top);

		&.success {
			border-top-color: var(--color-success);
			background: var(--color-background-success);
		}
		&.error {
			border-top-color: var(--color-error);
			background: var(--color-background-error);
		}
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: var(--space);

		@include screen-medium {
			flex-direction: row;
		}
	}
	.modalBody {
		margin: 0 0 var(--space-lg) 0;
	}
	.modalFooter {
		display: flex;
		flex-direction: column;
		gap: var(--space);
		justify-content: space-between;

		@include screen-medium {
			flex-direction: row;
		}
	}
	.responseRatingIconContainer {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 2px solid var(--color-success);
		font-size: 30px;
		font-weight: bold;
		display: grid;
		place-items: center;

		&.responseRatingIconContainer_error {
			border-color: var(--color-error);
		}
	}
</style>
