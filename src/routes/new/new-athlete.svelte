<script lang="ts">
	import { addAthlete } from './athletes';

	let name = '';
	function handleEnter() {
		addAthlete(name);
		name = '';
	}
</script>

<form on:submit|preventDefault={handleEnter} class="my-5">
	<span>Nuovo atleta</span>
	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<label class="label">
			<input class="input" type="text" bind:value={name} placeholder="Nome atleta" />
		</label>
		<button class="variant-filled-secondary">Aggiungi</button>
	</div>
</form>
