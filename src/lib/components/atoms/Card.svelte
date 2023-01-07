<div>
	<slot />
</div>

<style>
	div {
		background-color: var(--color-background-alt);
		padding: var(--space-lg) clamp(var(--space), 5vw, var(--space-xl));
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
	}
</style>
