<script lang="ts">
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';

	import type { PageData } from './$types';
	import MarkdownEditor from '$lib/components/molecules/MarkdownEditor.svelte';

	export let data: PageData;

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify);

	let text = '';
	$: rendered = processor.processSync(text).toString();
</script>

<h1>Admin</h1>
<MarkdownEditor bind:value={text} />
