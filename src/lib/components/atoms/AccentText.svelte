<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'tertiary' | 'gradient' | 'error' | 'success' =
		'gradient';
</script>

<span class={variant}>
	<slot />
</span>

<style lang="scss">
	@use '$lib/styles/_utilities.scss';

	.gradient {
		@extend .with-text-gradient;
	}

	.primary {
		color: var(--color-primary);
	}

	.secondary {
		color: var(--color-secondary);
	}

	.tertiary {
		color: var(--color-tertiary);
	}

	.success {
		color: var(--color-success);
	}

	.error {
		color: var(--color-danger);
	}
</style>
