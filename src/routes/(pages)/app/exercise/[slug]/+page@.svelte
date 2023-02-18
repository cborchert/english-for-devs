<script lang="ts">
	import IconCorrect from '~icons/ph/check';
	import IconError from '~icons/ph/x';
	import { scale } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	import { checkResponse } from '$lib/scripts/questions';
	import { audioEnabled } from '$lib/stores/audioStore';

	import AudioSettingButton from '$lib/components/atoms/AudioSettingButton.svelte';
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
	let responseAudio =
		exerciseQuestions[0].responseAudioUrl && typeof Audio !== 'undefined'
			? new Audio(exerciseQuestions[0].responseAudioUrl)
			: null;
	let responseSound: HTMLAudioElement | null = null;
	let correctAudio: HTMLAudioElement | null = null;
	let incorrectAudio: HTMLAudioElement | null = null;
	let completeAudio: HTMLAudioElement | null = null;

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

	onMount(async () => {
		document.addEventListener('visibilitychange', handleVisibilityChange, false);
		correctAudio = new Audio('/audio/correct.mp3');
		incorrectAudio = new Audio('/audio/incorrect.mp3');
		completeAudio = new Audio('/audio/complete.mp3');
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
		if ($audioEnabled) {
			responseSound = answerIsCorrect ? correctAudio : incorrectAudio;
			responseSound?.play();
			responseAudio?.play();
		}
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
		// NOTE this is necessary since sometimes the audio is still playing when the next question is rendered
		if (responseSound) {
			responseSound.pause();
			responseSound.currentTime = 0;
		}
		if (done && $audioEnabled) {
			completeAudio?.play();
		}
		responseAudio = newStack[0]?.responseAudioUrl ? new Audio(newStack[0].responseAudioUrl) : null;
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
					<AudioSettingButton />
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
		<main
			in:scale={{
				duration: 70,
				opacity: 0.5,
				start: 0.5,
				easing: cubicIn
			}}
		>
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
		margin: 0 var(--space-lg);
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
