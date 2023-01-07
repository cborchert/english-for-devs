<script>
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
</script>

<Card>
	<div>
		<h1>Welcome to <AccentText>English for Devs</AccentText></h1>
		<p><a href="/typography-test">Check the typography</a></p>
		<p><Button href="/quiz-example">Take a quiz</Button></p>
	</div>
</Card>
