<script lang="ts">
	import IconClose from '~icons/ph/x';
</script>

<button class="close" on:click><IconClose /></button>

<style lang="scss">
	.close {
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		text-align: center;
		color: var(--color-text);
		opacity: 0.8;
		display: inline-grid;
		place-items: center;

		&:hover {
			opacity: 1;
		}
	}
</style>
