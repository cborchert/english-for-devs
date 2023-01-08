<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import ProgressBar from '$lib/components/atoms/ProgressBar.svelte';
	import MultipleSelectExercise from '$lib/components/molecules/exercises/MultipleSelectExercise.svelte';
	import FreeResponseExercise from '$lib/components/molecules/exercises/FreeResponseExercise.svelte';

	const exercises = [
		{
			type: 'multipleSelect',
			question: 'Comment dit-on <mark>« réunion »</mark> ?',
			options: [
				{ value: 'Reunion', text: 'Reunion' },
				{ value: 'Date', text: 'Date' },
				{ value: 'Meeting', text: 'Meeting' }
			],
			keepOrder: false,
			correctResponse: 'Meeting',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'multipleSelect',
			question: 'What is the English word for <mark>« ordinateur »</mark> ?',
			options: [
				{ value: 'Computer', text: 'Computer' },
				{ value: 'Keyboard', text: 'Keyboard' },
				{ value: 'Mouse', text: 'Mouse' }
			],
			keepOrder: false,
			correctResponse: 'Computer',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'multipleSelect',
			question: 'How do you say <mark>« smartphone »</mark> in English?',
			options: [
				{ value: 'Cell phone', text: 'Cell phone' },
				{ value: 'Smartphone', text: 'Smartphone' },
				{ value: 'Landline', text: 'Landline' }
			],
			keepOrder: false,
			correctResponse: 'Smartphone',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'multipleSelect',
			question: 'What is the English translation of <mark>« logiciel »</mark>?',
			options: [
				{ value: 'Hardware', text: 'Hardware' },
				{ value: 'Software', text: 'Software' },
				{ value: 'Operating system', text: 'Operating system' }
			],
			keepOrder: false,
			correctResponse: 'Software',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'multipleSelect',
			question: 'Comment dit-on <mark>« développeur »</mark> en anglais ?',
			options: [
				{ value: 'Developer', text: 'Developer' },
				{ value: 'Designer', text: 'Designer' },
				{ value: 'Project manager', text: 'Project manager' }
			],
			keepOrder: false,
			correctResponse: 'Developer',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'multipleSelect',
			question: 'What is the English word for <mark>« équipe »</mark> ?',
			options: [
				{ value: 'Team', text: 'Team' },
				{ value: 'Company', text: 'Company' },
				{ value: 'Organization', text: 'Organization' }
			],
			keepOrder: false,
			correctResponse: 'Team',
			responseCaseSensitive: false,
			exactResponseOnly: false
		},
		{
			type: 'freeResponse',
			question: 'Translate the following word into English: <mark>« fichier »</mark>',
			correctResponse: 'File',
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			type: 'freeResponse',
			question: 'Translate the following phrase into English: <mark>« ouvrir un fichier »</mark>',
			correctResponse: 'Open a file',
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			type: 'freeResponse',
			question: 'Translate the following word into English: <mark>« ordinateur portable »</mark>',
			correctResponse: 'Laptop',
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			type: 'freeResponse',
			question: 'Translate the following word into English: <mark>« clavier »</mark>',
			correctResponse: 'Keyboard',
			exactResponseOnly: false,
			responseCaseSensitive: false
		},
		{
			type: 'freeResponse',
			question:
				'Translate the following phrase into English: <mark>« sauvegarder un fichier »</mark>',
			correctResponse: 'Save a file',
			exactResponseOnly: false,
			responseCaseSensitive: false
		}
	];

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

	function check(
		response: string = '',
		correctResponse: string = '',
		caseSensitive: boolean = false,
		exactResponseOnly: boolean = false
	) {
		let transformedResponse = caseSensitive ? response : response.toLowerCase();
		let transformedCorrectResponse = caseSensitive
			? correctResponse
			: correctResponse.toLowerCase();
		if (exactResponseOnly) {
			return transformedResponse === transformedCorrectResponse;
		} else {
			// remove all punctuation marks
			transformedResponse = transformedResponse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
			transformedCorrectResponse = transformedCorrectResponse
				.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
				.trim();
			return transformedResponse === transformedCorrectResponse;
		}
	}

	// if control/cmnd + enter is pressed, submit the answer
	// handle mac and windows
	function handleKeydown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			if (hasSubmitted) {
				next();
			} else {
				respond();
			}
		}
	}

	$: fill = exercises.length ? Math.floor((currentExercise / exercises.length) * 100) : 0;

	$: ({ correctResponse, responseCaseSensitive, exactResponseOnly, type } =
		exercises[currentExercise] || {});

	$: {
		if (hasSubmitted) {
			answerIsCorrect = check(answer, correctResponse, responseCaseSensitive, exactResponseOnly);
		}
	}
</script>

<div class="quizExample" on:keydown={handleKeydown}>
	{#if currentExercise < exercises.length}
		<header>
			<Container>
				<ProgressBar {fill} variant="gradient" />
			</Container>
		</header>
	{/if}
	<main>
		{#if currentExercise < exercises.length}
			{#if exercises[currentExercise]?.type === 'multipleSelect'}
				<MultipleSelectExercise
					options={exercises[currentExercise].options}
					bind:value={answer}
					disabled={hasSubmitted}
					randomize={!exercises[currentExercise].keepOrder}
				>
					<span slot="question">{@html exercises[currentExercise].question || ''}</span>
				</MultipleSelectExercise>
			{:else if exercises[currentExercise]?.type === 'freeResponse'}
				<FreeResponseExercise bind:value={answer} disabled={hasSubmitted}>
					<span slot="question">{@html exercises[currentExercise].question || ''}</span>
				</FreeResponseExercise>
			{/if}
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
								La bonne réponse était <strong>&laquo; {correctResponse} &raquo;</strong>
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
		background: var(--color-background);
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
</style>
