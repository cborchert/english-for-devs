<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	import Container from '../atoms/Container.svelte';
	import IconClose from '~icons/ph/x';

	export let title: string = '';

	const dispatch = createEventDispatcher();

	const closeHandler = () => {
		dispatch('close');
	};
</script>

<div class="modalBackground">
	<Container size="xl">
		<div class="modal" transition:fly={{ y: -200, duration: 100 }}>
			<div class="modalHeader">
				<div class="modalTitle">{title}</div>
				<button class="close" on:click={closeHandler}><IconClose /></button>
			</div>
			<div class="modalBody"><slot /></div>
		</div>
	</Container>
</div>

<style lang="scss">
	.modalBackground {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(5px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.modal {
		background-color: var(--color-background-alt);
		border-radius: var(--border-radius);
		padding: var(--space);
		max-height: 95vh;
		overflow-y: auto;
	}
	.modalTitle {
		font-size: var(--font-size-lg);
	}
	.modalHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.modalBody {
		padding: var(--space) 0 0;
		border-radius: var(--border-radius);
	}
	.close {
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		text-align: center;
		color: var(--color-text);
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
</style>
