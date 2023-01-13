<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import IconEye from '~icons/ph/eye';
	import IconEyeClosed from '~icons/ph/eye-closed';

	export let label: string = '';
	export let value: string = '';
	let inputType: string = 'text';
	export { inputType as type };

	let currentType = inputType;
	const togglePasswordVisibility = () => {
		currentType = currentType === 'password' ? 'text' : 'password';
	};

	const handleOnInput: FormEventHandler<HTMLInputElement> = (e) => {
		value = (e?.target as HTMLInputElement)?.value || '';
	};
</script>

<label>
	{label}
	<div>
		<input
			type={currentType}
			on:input={handleOnInput}
			on:blur
			on:change
			on:click
			on:focus
			on:keypress
			{...$$restProps}
		/>
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
</label>

<style lang="scss">
	input {
		width: 100%;
		display: block;
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
