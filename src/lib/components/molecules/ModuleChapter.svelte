<script lang="ts">
	import IconBarbell from '~icons/ph/barbell';
	import IconBook from '~icons/ph/book-open';
	import IconAudio from '~icons/ph/speaker-high';
	import IconVideo from '~icons/ph/monitor-play';
	import IconText from '~icons/ph/article';
	import IconList from '~icons/ph/list-checks';
	import Modal from './Modal.svelte';
	import Button from '../atoms/Button.svelte';

	export let type: 'exercise' | 'reading' | 'audio' | 'video' | 'text' | 'list' = 'exercise';
	$: chapterIcon = {
		exercise: IconBarbell,
		reading: IconBook,
		audio: IconAudio,
		video: IconVideo,
		text: IconText,
		list: IconList
	}[type];

	export let title: string = '';
	export let progress: number = 0;
	export let href: string = '';

	$: complete = progress >= 100;

	let isContinueModalShown: boolean = false;
</script>

<div class="moduleChapter">
	<div
		class="moduleChapterIcon"
		style="background: conic-gradient(
        var(--color-text-gradient-start),
		var(--color-text-gradient-stop),
        var(--color-text-gradient-start) {progress}%,
        var(--color-background) {progress}%
        )"
	>
		<a
			{href}
			class="moduleChapterIconButton {complete ? 'complete' : ''}"
			on:click={(e) => {
				if (complete) {
					e.preventDefault();
					isContinueModalShown = true;
				}
			}}
		>
			<svelte:component this={chapterIcon} />
		</a>
	</div>
	<div class="moduleChapterTitle">
		<h5>
			<a
				{href}
				class="is-color-text"
				on:click={(e) => {
					if (complete) {
						e.preventDefault();
						isContinueModalShown = true;
					}
				}}>{title}</a
			>
		</h5>
	</div>
</div>
{#if isContinueModalShown}
	<Modal
		on:close={() => {
			isContinueModalShown = false;
		}}
		title="Voulez-vous continuer ?"
		size="xs"
	>
		<p>Vous avez déjà complété cette exercice. Est-ce que vous voulez réviser ?</p>
		<div class="modalFooter">
			<Button
				on:click={() => {
					isContinueModalShown = false;
				}}
				variant="ghost">Annuler</Button
			>
			<Button href={`${href}?allQuestions=true&random=true`} variant="success">Continuer</Button>
		</div>
	</Modal>
{/if}

<style lang="scss">
	@use '$lib/styles/_breakpoints.scss' as *;
	.moduleChapter {
		display: flex;
		align-items: center;
		margin-bottom: var(--space-lg);

		a {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
	}
	h5 {
		margin: 0;
	}
	.moduleChapterIcon {
		padding: var(--space-sm);
		font-size: var(--font-size-xl);
		display: grid;
		place-items: center;
		border-radius: 50%;
	}
	.moduleChapterIconButton {
		color: var(--color-text);
		background: var(--color-background-alt);
		border-radius: 50%;
		padding: var(--space-sm);
		transition: 300ms;
		&:after {
			display: none;
		}
		&:hover {
			transform: scale(1.4);
		}
		&:hover,
		&.complete {
			background: conic-gradient(
				var(--color-text-gradient-start),
				var(--color-text-gradient-stop),
				var(--color-text-gradient-start)
			);
		}
	}
	.moduleChapterTitle {
		margin-left: var(--space);
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
</style>
