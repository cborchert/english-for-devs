<script lang="ts">
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';
	import Input from '../atoms/Input.svelte';

	export let size: number = 400;
	export let value: string = '';
	export let name: string = '';
	export let label: string = '';
	export let error: string = '';

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true });

	$: rendered = processor.processSync(value).toString();
</script>

<div class="markdownEditor">
	<label for={name}
		>{label}
		<div class="markdownEditorInner">
			<div>
				<p class="sectionLabel">
					<em>
						Markdown input
						<a href="https://www.markdownguide.org/basic-syntax" target="_blank" rel="noreferrer">
							(?)
						</a>
					</em>
				</p>
				<Input
					type="textarea"
					style="height: {size}px;"
					bind:value
					{name}
					id={name}
					{error}
					noMargin
				/>
			</div>
			<div>
				<p class="sectionLabel"><em><mark>Output preview</mark></em></p>
				<div class="preview" style="height: {size}px;">{@html rendered}</div>
			</div>
		</div>
	</label>
</div>

<style lang="scss">
	@use '$lib/styles/_breakpoints.scss' as *;

	.sectionLabel {
		font-size: var(--font-size-sm);
	}
	.markdownEditor {
		margin: 0 auto;
		max-width: var(--width-xxxl);
		width: 100%;
	}
	.markdownEditorInner {
		@include screen-large {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1rem;
		}
	}
	p {
		margin: 0;
	}
	textarea,
	.preview {
		height: 400px;
		overflow: auto;
	}

	.preview {
		border: 2px solid var(--color-background-alt-light);
		padding: var(--space);
		border-radius: var(--border-radius);
	}
</style>
