<script lang="ts">
	export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
</script>

<div class={type}>
	<slot />
</div>

<style>
	div {
		padding: var(--space-sm) var(--space);
		border-radius: var(--border-radius);
		font-size: var(--font-size-sm);
	}
	.info {
		background-color: var(--color-neutral);
	}
	.success {
		background-color: var(--color-success);
	}
	.warning {
		background-color: var(--color-warning);
	}
	.error {
		background-color: var(--color-error);
	}
</style>
