<script>
	import Button from '../atoms/Button.svelte';
</script>

<form>
	<div>
		<input type="email" placeholder="adresse e-mail" />
	</div>
	<fieldset>
		<label>
			<input type="checkbox" />
			Je veux être informé lorsque le cours sera disponible en bêta
		</label>
		<label>
			<input type="checkbox" />
			I agree to the terms and conditions
		</label>
	</fieldset>
	<div><Button>Subscribe</Button></div>
	<p class="details">
		Je prends au sérieux la protection de vos données personnelles et respectons votre vie privée.
		Vous pouvez résilier votre abonnement en tout temps.
	</p>
</form>

<style>
	.details {
		margin-top: var(--space-md);
		color: var(--color-disabled);
		font-size: var(--font-size-sm);
	}
</style>
