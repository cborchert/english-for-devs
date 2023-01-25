<script lang="ts">
	export let size: ContainerSize = 'lg';
</script>

<div class={size} {...$$restProps}>
	<slot />
</div>

<style lang="scss">
	div {
		margin: 0 auto;
		max-width: var(--width-xxl);
		width: 100%;
		padding: var(--space-lg) var(--space);

		&.sm {
			max-width: var(--width-lg);
		}

		&.lg {
			max-width: var(--width-xl);
		}
	}
</style>
