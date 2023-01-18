<script lang="ts">
	import type { PageData } from './$types';

	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	let text = '';
</script>

<Container>
	<h1>Admin</h1>
	<MarkdownEditor bind:value={text} />
</Container>
