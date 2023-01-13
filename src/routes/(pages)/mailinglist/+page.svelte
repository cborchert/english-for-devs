<script>
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import AccentText from '$lib/components/atoms/AccentText.svelte';
	import MailingListSubscriptionForm from '$lib/components/molecules/MailingListSubscriptionForm.svelte';
</script>

<Card>
	<h1><AccentText>Anglais pour les devs</AccentText></h1>
	<h4>Un cours d'anglais spécialisé pour les personnes travaillant dans l'informatique.</h4>
	<h5>Le cours est en plein developpement, mais je peux vous dire dès qu'il sera prêt.</h5>
	<MailingListSubscriptionForm />
</Card>
