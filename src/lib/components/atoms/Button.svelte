<script lang="ts">
	export let onClick: () => void = () => {};
	export let href: string | null | undefined = undefined;
	export let variant:
		| 'primary'
		| 'secondary'
		| 'gradient'
		| 'error'
		| 'success'
		| 'neutral'
		| 'tertiary' = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let disabled: boolean = false;

	const variantClassNames = {
		primary: 'button--primary',
		secondary: 'button--secondary',
		tertiary: 'button--tertiary',
		success: 'button--success',
		error: 'button--error',
		neutral: 'button--neutral',
		gradient: 'button--gradient'
	};

	const sizeClassNames = {
		small: 'button--small',
		medium: 'button--medium',
		large: 'button--large'
	};

	const className = ['button', variantClassNames[variant], sizeClassNames[size]].join(' ');

	// tag is determined by the presence of an href
	const tag: 'button' | 'a' = href ? 'a' : 'button';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element this={tag} on:click={onClick} class={className} {disabled} {href} {...$$restProps}>
	<slot />
</svelte:element>

<style lang="scss">
	@use '$lib/styles/_utilities.scss';

	.button {
		background: var(--color-primary);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		border: none;
		color: var(--color-text);
		cursor: pointer;
		display: inline-block;

		padding: var(--space) var(--space-xl);
		margin: var(--space-xs);
		text-align: center;
		text-decoration: none;
		transition: all 0.2s ease-in-out;
		opacity: 0.9;

		&:hover,
		&:active {
			opacity: 1;
			transform: scale(1.05);
		}

		&:disabled {
			&,
			&:hover,
			&:active {
				background: var(--color-disabled-dark);
				cursor: not-allowed;
				transform: none;
				opacity: 0.6;
			}
		}
		&.button--gradient {
			@extend .with-background-gradient-bright;
		}

		&.button--secondary {
			background: var(--color-secondary);
		}

		&.button--tertiary {
			background: var(--color-tertiary);
		}

		&.button--success {
			background: var(--color-success);
		}

		&.button--error {
			background: var(--color-danger);
		}

		&.button--neutral {
			background: var(--color-neutral);
		}

		&.button--small {
			padding: var(--space-sm) var(--space);
		}

		&.button--large {
			padding: var(--space-md) var(--space-xl);
			font-size: var(--font-size-lg);
		}
	}
</style>
