<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let asButton: boolean = false;

	export let variant:
		| 'primary'
		| 'secondary'
		| 'secondary-dark'
		| 'tertiary'
		| 'gradient'
		| 'error'
		| 'success'
		| 'success-dark'
		| 'neutral'
		| 'ghost'
		| 'light'
		| 'dark'
		| 'gradient-dull'
		| void = undefined;

	const variantClassNames = {
		primary: 'card--primary',
		secondary: 'card--secondary',
		'secondary-dark': 'card--secondary-dark',
		tertiary: 'card--tertiary',
		success: 'card--success',
		'success-dark': 'card--success-dark',
		error: 'card--error',
		neutral: 'card--neutral',
		ghost: 'card--ghost',
		gradient: 'card--gradient',
		'gradient-dull': 'card--gradient-dull',
		light: 'card--light',
		dark: 'card--dark'
	};

	export let padding: 'none' | 'md' = 'md';

	const paddingClassNames = {
		none: 'card--no-padding',
		md: ''
	};

	export let background: string = '';

	$: paddingClassName = padding ? paddingClassNames[padding] : '';
	$: variantClassName = variant ? variantClassNames[variant] : '';
	$: className = ['card', variantClassName, paddingClassName].filter((a) => a).join(' ');
	$: tag = asButton ? 'button' : 'div';
	$: restCardProps = { ...$$restProps, ...(asButton ? { type: 'button' } : undefined) };
	$: style = background ? `background: ${background};` : undefined;

	const dispatch = createEventDispatcher();
</script>

<svelte:element
	this={tag}
	class={className}
	{style}
	on:click={() => dispatch('click')}
	{...restCardProps}
>
	<slot />
</svelte:element>

<style lang="scss">
	@use '$lib/styles/_utilities.scss';

	.card {
		position: relative;
		display: block;
		border: none;
		width: 100%;
		color: var(--color-text);
		background-color: var(--color-background-alt);
		padding: var(--space-lg) clamp(var(--space), 5vw, var(--space-xl));
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		margin: var(--space) auto;

		&.card--no-padding {
			padding: 0;
		}

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

		&.card--secondary-dark {
			background: var(--color-secondary-dark);
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

		&.card--success-dark {
			background: var(--color-success-dark);
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
