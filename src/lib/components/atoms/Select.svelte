<script lang="ts">
	import IconArrow from '~icons/ph/caret-down';

	export let label: string = '';
	export let error: string = '';
	export let noMargin: boolean = false;
	export let value: string = '';
	export let options: Array<{ value: string; label: string }> = [];
</script>

<label class:noMargin>
	{label}
	<div class="selectContainer">
		<select
			on:blur
			on:change
			on:click
			on:focus
			on:keypress
			class:isError={!!error}
			{value}
			{...$$restProps}
		>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<div class="arrow">
			<IconArrow />
		</div>
	</div>
	{#if error}
		<p class="errorMessage">{error}</p>
	{/if}
</label>

<style lang="scss">
	label.noMargin {
		margin-bottom: 0;
	}

	.arrow {
		position: absolute;
		top: 50%;
		right: var(--space);
		transform: translateY(-50%);
		margin-top: 2px;
		pointer-events: none;
	}

	.selectContainer {
		position: relative;
	}

	select {
		appearance: none;
		&.isError {
			border-color: var(--color-error);
		}
	}

	.errorMessage {
		color: var(--color-error);
		font-size: var(--font-size-sm);
	}

	.select {
		text-align: left;
		background: var(--color-background-alt);
		border: 2px solid var(--color-background-alt-light);
		border-radius: var(--border-radius);
		width: 100%;
		outline: none;
		padding: var(--space);
		color: var(--color-text);

		&:focus {
			border-color: var(--color-primary);
		}

		&:disabled {
			background: var(--color-background-alt-light);
			border-color: var(--color-background-alt-light);
			cursor: not-allowed;
		}
	}

	select {
		width: 100%;
		display: block;
		&.isError {
			border-color: var(--color-error);
		}
	}
	.errorMessage {
		color: var(--color-error);
		font-size: var(--font-size-sm);
	}
</style>
