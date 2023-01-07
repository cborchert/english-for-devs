<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Container from '$lib/components/atoms/Container.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import ProgressBar from '$lib/components/atoms/ProgressBar.svelte';
	import MultipleSelectExercise from '$lib/components/molecules/exercises/MultipleSelectExercise.svelte';

	let fill = 33;

	let answer: string | undefined = undefined;
	let correctResponse = 'Meeting';
	let hasSubmitted = false;
	let caseInsensitive = true;
	let answerIsCorrect = false;
	$: {
		if (hasSubmitted) {
			const transformedAnswer = caseInsensitive ? answer?.toLowerCase() : answer;
			const transformedCorrectResponse = caseInsensitive
				? correctResponse.toLowerCase()
				: correctResponse;
			answerIsCorrect = transformedAnswer === transformedCorrectResponse;
		}
	}
</script>

<div class="quizExample">
	<header>
		<Container>
			<ProgressBar {fill} variant="gradient" />
		</Container>
	</header>
	<main>
		<MultipleSelectExercise
			options={[
				{ value: 'Reunion', text: 'Reunion' },
				{ value: 'Date', text: 'Date' },
				{ value: 'Meeting', text: 'Meeting' }
			]}
			bind:value={answer}
			disabled={hasSubmitted}
		>
			<span slot="question">Comment dit-on <AccentText>&laquo; réunion &raquo;</AccentText> ?</span>
		</MultipleSelectExercise>
	</main>
	<footer>
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
					<Button variant={answerIsCorrect ? 'success' : 'error'}>Continuer</Button>
				{:else}
					<Button
						on:click={() => {
							answer = undefined;
							hasSubmitted = true;
						}}
						variant="ghost">Passer</Button
					>
					<Button on:click={() => (hasSubmitted = true)} disabled={!answer}>Valider</Button>
				{/if}
			</div>
		</Container>
	</footer>
</div>

<style lang="scss">
	@use '$lib/styles/_breakpoints.scss' as *;

	.responseRating {
		font-size: var(--font-size-lg);
	}

	header {
		position: sticky;
		top: 0;
	}

	main {
		margin: var(--space-xl) 0;
		flex: 1;
	}

	footer {
		position: fixed;
		bottom: 0;
		box-shadow: var(--box-shadow-top);
		width: 100%;
		background: var(--color-background-alt);
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
