<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let asButton: boolean = false;

	export let variant:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'gradient'
		| 'error'
		| 'success'
		| 'neutral'
		| 'ghost'
		| 'light'
		| 'dark'
		| 'gradient-dull'
		| void = undefined;

	const dispatch = createEventDispatcher();

	const variantClassNames = {
		primary: 'card--primary',
		secondary: 'card--secondary',
		tertiary: 'card--tertiary',
		success: 'card--success',
		error: 'card--error',
		neutral: 'card--neutral',
		ghost: 'card--ghost',
		gradient: 'card--gradient',
		'gradient-dull': 'card--gradient-dull',
		light: 'card--light',
		dark: 'card--dark'
	};

	$: variantClassName = variant ? variantClassNames[variant] : '';
	$: className = ['card', variantClassName].join(' ');
	$: tag = asButton ? 'button' : 'div';
</script>

<svelte:element this={tag} class={className} on:click={() => dispatch('click')} {...$$restProps}>
	<slot />
</svelte:element>

<style lang="scss">
	@use '$lib/styles/_utilities.scss';

	.card {
		display: block;
		border: none;
		width: 100%;
		color: var(--color-text);
		background-color: var(--color-background-alt);
		padding: var(--space-lg) clamp(var(--space), 5vw, var(--space-xl));
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		margin: var(--space) auto;

		&.card--gradient {
			@extend .with-background-gradient-bright;
		}

		&.card--gradient-dull {
			@extend .with-background-gradient;
		}

		&.card--light {
			background: var(--color-background-alt-light);
		}

		&.card--dark {
			background: var(--color-background);
		}

		&.card--primary {
			background: var(--color-primary);
		}

		&.card--secondary {
			background: var(--color-secondary);
		}

		&.card--tertiary {
			background: var(--color-tertiary);
		}

		&.card--ghost {
			background: transparent;
			border: 1px solid var(--color-text);
		}

		&.card--success {
			background: var(--color-success);
		}

		&.card--error {
			background: var(--color-danger);
		}

		&.card--neutral {
			background: var(--color-neutral);
		}
	}

	button.card {
		cursor: pointer;
		opacity: 0.8;
		transition: opacity 0.2s ease-in-out;

		&:hover {
			transform: scale(1.02);
			opacity: 1;
		}
	}
</style>
