<script lang="ts">
	import type { PageData } from './$types';

	import { checkResponse, QUESTION_TYPES } from '$lib/scripts/questions';

	import Card from '$lib/components/atoms/Card.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import ProgressBar from '$lib/components/atoms/ProgressBar.svelte';
	import Question from '$lib/components/molecules/questions/Question.svelte';
	import CloseButton from '$lib/components/atoms/CloseButton.svelte';
	import Modal from '$lib/components/molecules/Modal.svelte';

	export let data: PageData;

	const exercises = [
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'Comment dit-on <mark>« réunion »</mark> ?',
			options: ['Reunion', 'Date', 'Meeting'],
			keepOrder: false,
			answers: ['Meeting'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'What is the English word for <mark>« ordinateur »</mark> ?',
			options: ['Computer', 'Keyboard', 'Mouse'],
			keepOrder: false,
			answers: ['Computer'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'How do you say <mark>« smartphone »</mark> in English?',
			options: ['Cell phone', 'Smartphone', 'Landline'],
			keepOrder: false,
			answers: ['Smartphone'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'What is the English translation of <mark>« logiciel »</mark>?',
			options: ['Hardware', 'Software', 'Operating system'],
			keepOrder: false,
			answers: ['Software'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'Comment dit-on <mark>« développeur »</mark> en anglais ?',
			options: ['Developer', 'Designer', 'Project manager'],
			keepOrder: false,
			answers: ['Developer'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
			question: 'What is the English word for <mark>« équipe »</mark> ?',
			options: ['Team', 'Company', 'Organization'],
			keepOrder: false,
			answers: ['Team'],
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			questionType: QUESTION_TYPES.FREE_RESPONSE,
			question: 'Translate the following word into English: <mark>« fichier »</mark>',
			answers: ['File'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.FREE_RESPONSE,
			question: 'Translate the following phrase into English: <mark>« ouvrir un fichier »</mark>',
			answers: ['Open a file'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.FREE_RESPONSE,
			question: 'Translate the following word into English: <mark>« ordinateur portable »</mark>',
			answers: ['Laptop'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.FREE_RESPONSE,
			question: 'Translate the following word into English: <mark>« clavier »</mark>',
			answers: ['Keyboard'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.FREE_RESPONSE,
			question:
				'Translate the following phrase into English: <mark>« sauvegarder un fichier »</mark>',
			answers: ['Save a file'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
			question:
				'Translate the following sentence into English: <mark>« Je suis en train de télécharger un fichier »</mark>',
			answers: ['I am downloading a file'],
			options: [
				'File',
				'Am',
				'You',
				'I',
				'Uploading',
				'A',
				'Computer',
				'Were',
				'Was',
				'Downloading',
				'The',
				'Document',
				'Are'
			],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
			question:
				'Translate the following sentence into English: <mark>« Je suis développeur »</mark>',
			answers: ['I am a developer'],
			options: ['A', 'Developer', 'I', 'Am', 'An', 'Programmer', 'Engineer', 'Were', 'You', 'Was'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
			question:
				'Translate the following sentence into English: <mark>« Je suis en train de travailler sur mon ordinateur »</mark>',
			answers: ['I am working on my computer'],
			options: ['On', 'Working', 'I', 'Am', 'My', 'Computer', 'A', 'The', 'You', 'Were', 'Was'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			questionType: QUESTION_TYPES.ASSISTED_RESPONSE,
			question:
				'Translate the following phrase into English: <mark>« enregistrer un fichier »</mark>',
			answers: ['Save a file'],
			options: ['File', 'A', 'Save', 'The', 'Document', 'Upload', 'Download', 'My', 'Your'],
			exactResponseOnly: false,
			responseCaseSensitive: false
		}
	].sort(() => Math.random() - 0.5);

	let currentExercise = 0;
	let hasSubmitted = false;
	let answer: string | undefined = undefined;
	let answerIsCorrect: boolean = false;

	function respond(skip: boolean = false) {
		hasSubmitted = true;
		if (skip) {
			answer = undefined;
		}
	}

	function next() {
		hasSubmitted = false;
		answer = undefined;
		answerIsCorrect = false;
		currentExercise++;
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

	let isCloseModalShown = false;

	function showCloseModal(isShown: boolean = true) {
		isCloseModalShown = isShown;
	}

	$: percentComplete = exercises.length
		? Math.floor((currentExercise / exercises.length) * 100)
		: 0;

	$: ({ answers, responseCaseSensitive, exactResponseOnly, questionType } =
		exercises[currentExercise] || {});

	$: {
		if (hasSubmitted) {
			answerIsCorrect = checkResponse(answer, answers, responseCaseSensitive, exactResponseOnly);
		}
	}
</script>

<div class="quizExample" on:keydown={handleKeydown}>
	{#if currentExercise < exercises.length}
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
	{/if}
	<main>
		{#if currentExercise < exercises.length}
			{#key currentExercise}
				<Question
					question={exercises[currentExercise]}
					bind:value={answer}
					disabled={hasSubmitted}
				/>
			{/key}
		{:else}
			<Container>
				<Card>
					<p class="h1"><AccentText>Bravo !</AccentText></p>
					<p class="h3">Vous avez terminé le quiz.</p>
					<Button href="/">Go Home</Button>
				</Card>
			</Container>
		{/if}
	</main>
	{#if currentExercise < exercises.length}
		<footer
			class:success={hasSubmitted && answerIsCorrect}
			class:error={hasSubmitted && !answerIsCorrect}
		>
			<Container>
				<div class="footer-inner">
					{#if hasSubmitted}
						<div class="responseRating">
							{#if answerIsCorrect}
								<strong>Bravo !</strong>
							{:else}
								La bonne réponse était <strong>&laquo; {answers[0]} &raquo;</strong>
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
		gap: var(--space);
		justify-content: space-between;
	}
</style>
