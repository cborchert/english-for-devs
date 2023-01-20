<script lang="ts">
	import IconEye from '~icons/ph/eye';
	import IconEyeClosed from '~icons/ph/eye-closed';

	export let label: string = '';
	export let value: string = '';
	export let error: string = '';
	export let noMargin: boolean = false;

	let inputType: string = 'text';
	export { inputType as type };
	let currentType = inputType;

	const togglePasswordVisibility = () => {
		currentType = currentType === 'password' ? 'text' : 'password';
	};

	$: additionalProps = { type: currentType };
</script>

<label class:noMargin>
	{label}
	<div>
		{#if currentType === 'textarea'}
			<textarea
				on:input
				bind:value
				on:blur
				on:change
				on:click
				on:focus
				on:keypress
				on:keydown
				on:keyup
				class:isError={!!error}
				rows={3}
				{...$$restProps}
			/>
		{:else if currentType === 'password'}
			<input
				on:input
				bind:value
				on:blur
				on:change
				on:click
				on:focus
				on:keypress
				on:keydown
				on:keyup
				class:isError={!!error}
				type="password"
				{...$$restProps}
			/>
		{:else}
			<input
				on:input
				bind:value
				on:blur
				on:change
				on:click
				on:focus
				on:keypress
				on:keydown
				on:keyup
				class:isError={!!error}
				{...additionalProps}
				{...$$restProps}
			/>
		{/if}
		{#if inputType === 'password'}
			<button on:click={togglePasswordVisibility} type="button">
				{#if currentType === 'password'}
					<IconEyeClosed />
				{:else}
					<IconEye />
				{/if}
			</button>
		{/if}
	</div>
	{#if error}
		<p class="errorMessage">{error}</p>
	{/if}
</label>

<style lang="scss">
	input {
		width: 100%;
		display: block;
	}
	label.noMargin {
		margin-bottom: 0;
	}
	.isError {
		border-color: var(--color-error);
	}
	.errorMessage {
		color: var(--color-error);
		font-size: var(--font-size-sm);
	}
	div {
		position: relative;
	}
	button {
		background: none;
		border: none;
		color: var(--color-text);
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		padding: var(--space);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}
</style>
