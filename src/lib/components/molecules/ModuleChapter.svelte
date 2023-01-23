<script lang="ts">
	import IconBarbell from '~icons/ph/barbell';
	import IconBook from '~icons/ph/book-open';
	import IconAudio from '~icons/ph/speaker-high';
	import IconVideo from '~icons/ph/monitor-play';
	import IconText from '~icons/ph/article';
	import IconList from '~icons/ph/list-checks';

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
		<a {href} class="moduleChapterIconButton {complete ? 'complete' : ''} ">
			<svelte:component this={chapterIcon} />
		</a>
	</div>
	<div class="moduleChapterTitle">
		<h5><a {href} class="is-color-text">{title}</a></h5>
	</div>
</div>

<style lang="scss">
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
</style>
