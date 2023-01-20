<script lang="ts">
	import { QUESTION_TYPES, type Question } from '$lib/scripts/questions';
	import AssistedResponse from './AssistedResponse.svelte';
	import FreeResponse from './FreeResponse.svelte';
	import MultipleChoice from './MultipleChoice.svelte';

	export let question: Question;
	export let randomizeOptions: boolean = true;
	export let disabled: boolean = false;
	export let value: string = '';

	$: ({ questionType, options = [], answers, title, question: questionContent = '' } = question);
</script>

{#if questionType === QUESTION_TYPES.MULTIPLE_CHOICE}
	<MultipleChoice {options} bind:value {disabled} randomize={randomizeOptions}>
		<span slot="question">{@html questionContent}</span>
	</MultipleChoice>
{:else if questionType === QUESTION_TYPES.FREE_RESPONSE}
	<FreeResponse bind:value {disabled}>
		<span slot="question">{@html questionContent}</span>
	</FreeResponse>
{:else if questionType === QUESTION_TYPES.ASSISTED_RESPONSE}
	<AssistedResponse bind:value {disabled} {options} randomize={randomizeOptions}>
		<span slot="question">{@html questionContent}</span>
	</AssistedResponse>
{/if}
