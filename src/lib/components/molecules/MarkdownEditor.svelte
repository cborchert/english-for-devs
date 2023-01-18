<script lang="ts">
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';

	export let value: string;

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true });

	$: rendered = processor.processSync(value).toString();
</script>

<div class="markdownEditor">
	<div>
		<p>
			<em>
				<a href="https://www.markdownguide.org/basic-syntax" target="_blank" rel="noreferrer">
					Markdown (?)
				</a>
				input
			</em>
		</p>
		<textarea bind:value />
	</div>
	<div>
		<p><em><mark>Output preview</mark></em></p>
		<div>{@html rendered}</div>
	</div>
</div>
<div />

<style lang="scss">
	@use '$lib/styles/_breakpoints.scss' as *;
	.markdownEditor {
		margin: var(--space) auto;
		max-width: var(--width-xxxl);
		width: 100%;

		@include screen-large {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1rem;
		}
	}
	p {
		margin: 0;
	}
</style>
