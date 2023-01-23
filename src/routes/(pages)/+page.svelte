<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Module from '$lib/components/molecules/Module.svelte';

	const chapters = [
		{
			type: 'video',
			title: 'Introduction and Objectives',
			progress: 100,
			href: '#'
		},
		{
			type: 'text',
			title: 'Greetings and Introductions',
			progress: 100,
			href: '#'
		},
		{
			type: 'exercise',
			title: 'Exercise 1',
			progress: 70,
			href: '#'
		},
		{
			type: 'exercise',
			title: 'Exercise 2',
			progress: 0,
			href: '#'
		},
		{
			type: 'audio',
			title: 'A Simple Conversation',
			progress: 0,
			href: '#'
		},
		{
			type: 'reading',
			title: 'A Simple Story',
			progress: 0,
			href: '#'
		},
		{
			type: 'list',
			title: 'Recap',
			progress: 0,
			href: '#'
		}
	];
	const modules = [
		{
			title: 'Module 1',
			subtitle: 'Saying Hello',
			variant: 'completed',
			showReview: true,
			progress: 100,
			chapters
		} as const,
		{
			title: 'Module 2',
			subtitle: "How's It Going?",
			variant: 'current',
			showReview: true,
			progress: 50,
			chapters
		} as const,
		{
			title: 'Module 3',
			subtitle: 'Daily Stand Up',
			variant: 'upcoming',
			chapters
		} as const,
		{
			title: 'Module 4',
			subtitle: 'Code Review',
			variant: 'locked',
			chapters
		} as const
	];
</script>

<Container size="sm">
	<h2>Welcome back!</h2>
	{#each modules as module}
		<Module {...module} />
	{/each}
</Container>
