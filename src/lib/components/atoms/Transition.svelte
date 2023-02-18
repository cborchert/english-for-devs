<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	export let url: string;
</script>

{#key url}
	<div in:fly={{ y: -200, duration: 300, delay: 300 }} out:fade={{ duration: 200 }}>
		<slot />
	</div>
{/key}
