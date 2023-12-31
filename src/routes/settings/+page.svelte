<script lang="ts">
  import Delete from '$lib/icons/delete.svelte';
  import { addClub, getSettings, removeClub } from '$lib/db/methods.js';

  export let data;
  const { settings } = data;
  $: clubs = settings.clubs || [];
  let club = '';

  function handleAdd() {
    if (!club) {
      return;
    }
    addClub(club);
    clubs = getSettings()?.clubs || [];
    club = '';
  }

  function handleRemove(clubToRemove: string) {
    if (!clubToRemove) {
      return;
    }
    removeClub(clubToRemove);
    clubs = getSettings()?.clubs || [];
  }
</script>

<h2 class="h2 mb-8">Impostazioni</h2>
<h3 class="h3">Club</h3>
<form on:submit|preventDefault={handleAdd} class="my-2">
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <label class="label">
      <input class="input" type="text" bind:value={club} placeholder="Nome club" />
    </label>
    <button class="variant-filled-primary" disabled={!club} on:click={handleAdd}>Aggiungi</button>
  </div>
</form>

<ul class="my-6">
  {#each clubs as club (club)}
    <li class="p-2 flex justify-between">
      {club}
      <button
        type="button"
        class="btn-icon btn-icon-sm variant-filled-primary [&>*]:pointer-events-none text-white"
        on:click={() => handleRemove(club)}><Delete /></button
      >
    </li>
    <hr />
  {/each}
</ul>
