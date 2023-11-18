<script>
	import { athletes } from './athletes';
	import NewAthlete from './new-athlete.svelte';
</script>

<ul class="list">
	{#each $athletes as athlete}
		<li>
			<span class="flex-auto">{athlete.name}</span>
		</li>
		<hr />
	{/each}
</ul>

<NewAthlete />

<button type="button" class="btn btn-xl variant-filled mx-auto w-full">Crea categoria</button>
