<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '../atoms/Button.svelte';
	import ProgressBar from '../atoms/ProgressBar.svelte';
	import IconCaretDown from '~icons/ph/caret-down';
	import IconLock from '~icons/ph/lock-key';
	import ModuleChapter from './ModuleChapter.svelte';

	export let title: string;
	export let subtitle: string;
	export let variant: 'current' | 'upcoming' | 'completed' | 'locked' = 'current';
	export let showReview: boolean = false;
	export let progress: number = 0;
	export let open: boolean = true;
	export let chapters: Array<{
		type: 'exercise' | 'reading' | 'audio' | 'video' | 'text' | 'list';
		title: string;
		progress: number;
		href: string;
	}> = [];
</script>

<div class="moduleContainer">
	{#if variant === 'locked'}
		<div class="moduleLockBadge">
			<IconLock />
		</div>
	{/if}
	<section class:restricted={variant === 'locked'}>
		<div class="moduleCard {variant}" class:closed={!open}>
			<div>
				<head>
					<button
						class="accordionButton {open ? 'open' : ''}"
						type="button"
						on:click={() => {
							open = !open;
						}}><IconCaretDown /></button
					>
					<div class="moduleTitle">
						<h4>
							{title}
						</h4>
						<h5>{subtitle}</h5>
					</div>
					<div class="moduleActions">
						{#if showReview}<Button variant="ghost">Review</Button>{/if}
					</div>
				</head>
				<div class="moduleProgress">
					<ProgressBar {progress} variant="gradient" />
				</div>
			</div>
		</div>
		{#if open}
			<main transition:slide={{ duration: 200 }} class={variant}>
				{#each chapters as chapter}
					<ModuleChapter
						type={chapter.type}
						title={chapter.title}
						progress={chapter.progress}
						href={chapter.href}
					/>
				{/each}
			</main>
		{/if}
	</section>
</div>

<style lang="scss">
	.moduleContainer {
		position: relative;
	}
	.moduleLockBadge {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: var(--font-size-xxl);
	}
	.moduleCard {
		padding: var(--space-md) var(--space-lg) var(--space-lg);
		background-color: var(--color-primary-dark);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		transition: border-radius 0s ease-in-out;

		&.current {
			background-color: var(--color-secondary);
		}

		&.upcoming,
		&.locked {
			background: transparent;
			border: 1px solid var(--color-text);
		}
		&.closed {
			transition: border-radius 0.1s 0.1s ease-in-out;
			border-radius: var(--border-radius);
		}
	}
	main {
		padding: var(--space-lg);
		background-color: var(--color-background-alt-light);
		border-radius: 0 0 var(--border-radius) var(--border-radius);
	}
	section {
		margin-bottom: var(--space-xl);
	}
	head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.moduleTitle {
		flex: 1;
		h4,
		h5 {
			margin: 0;
		}
	}
	.moduleActions {
		flex: 0;
		display: flex;
		flex-direction: column;
	}
	.restricted {
		pointer-events: none;
		user-select: none;
		opacity: 0.5;
		filter: blur(2px);
	}
	.moduleProgress {
		margin-top: var(--space-md);
	}
	.accordionButton {
		margin-right: var(--space-md);
		outline: 0;
		border: 0;
		color: var(--color-text-alt);
		background: transparent;
		cursor: pointer;
		transition: 200ms;
		opacity: 0.8;
		font-size: var(--font-size-lg);
		transform: rotateX(0);
		display: grid;
		justify-content: center;
		align-items: center;

		&.open {
			transform: rotateX(180deg);
		}
		&:hover {
			opacity: 1;
		}
	}
</style>
