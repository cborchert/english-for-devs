<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import Container from '../atoms/Container.svelte';
	import CloseButton from '../atoms/CloseButton.svelte';

	export let title: string = '';
	export let size: ContainerSize = 'lg';

	const dispatch = createEventDispatcher();

	const closeHandler = () => {
		dispatch('close');
	};
</script>

<div class="modalBackground">
	<Container {size}>
		<div class="modal" transition:fly={{ y: -200, duration: 100 }}>
			<div class="modalHeader">
				<div class="modalTitle">{title}</div>
				<CloseButton on:click={closeHandler} />
			</div>
			<div class="modalBody"><slot /></div>
		</div>
	</Container>
</div>

<style lang="scss">
	.modalBackground {
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
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
		padding: var(--space) 0;
		border-radius: var(--border-radius);
	}
</style>
