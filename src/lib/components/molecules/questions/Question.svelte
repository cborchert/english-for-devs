<script lang="ts">
	import { getMarkdownProcessor, QUESTION_TYPES, type Question } from '$lib/scripts/questions';
	import AssistedResponse from '$lib/components/molecules/questions/AssistedResponse.svelte';
	import FreeResponse from '$lib/components/molecules/questions/FreeResponse.svelte';
	import MultipleChoice from '$lib/components/molecules/questions/MultipleChoice.svelte';

	export let question: Question;
	export let randomizeOptions: boolean = true;
	export let disabled: boolean = false;
	export let value: string = '';

	$: ({ questionType, options = [], answers, title, question: questionContent = '' } = question);
	const processor = getMarkdownProcessor();
	$: rendered = processor.render(questionContent);
</script>

{#if questionType === QUESTION_TYPES.MULTIPLE_CHOICE}
	<MultipleChoice {options} bind:value {disabled} randomize={randomizeOptions}>
		<span slot="question">{@html rendered}</span>
	</MultipleChoice>
{:else if questionType === QUESTION_TYPES.FREE_RESPONSE}
	<FreeResponse bind:value {disabled}>
		<span slot="question">{@html rendered}</span>
	</FreeResponse>
{:else if questionType === QUESTION_TYPES.ASSISTED_RESPONSE}
	<AssistedResponse bind:value {disabled} {options} randomize={randomizeOptions}>
		<span slot="question">{@html rendered}</span>
	</AssistedResponse>
{/if}
