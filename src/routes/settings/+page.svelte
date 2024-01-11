<script lang="ts" strictEvents>
  import Delete from '$lib/icons/delete.svelte';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import { addClub, clubs, removeClub } from '../../lib/store/$settings';
  import { tournament } from '../../lib/store/$tournament';

  let club = '';

  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: 'confirm',
    title: 'Cancellare i dati?',
    body: 'Procedendo tutti i dati locali verranno cancellati',
    buttonTextConfirm: 'Cancella dati',
    buttonTextCancel: 'Annulla',
    response: (confirmDelete: boolean) => {
      if (!confirmDelete) {
        return;
      }
      localStorage.clear();
      window.location.reload();
    }
  };

  function handleAdd() {
    if (!club) {
      return;
    }
    addClub(club);
    club = '';
  }

  function handleRemove(clubToRemove: string) {
    if (!clubToRemove) {
      return;
    }
    removeClub(clubToRemove);
  }
</script>

<h2 class="h2 mb-8">Impostazioni</h2>
<h3 class="h3">Club</h3>
<form class="my-2 mb-4" on:submit|preventDefault={handleAdd}>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <label class="label">
      <input class="input" placeholder="Nome club" type="text" bind:value={club} />
    </label>
    <button
      class="variant-filled-primary"
      disabled={!club}
      type="button"
      on:click|preventDefault={handleAdd}>Aggiungi</button
    >
  </div>
</form>

<label class="label">
  <h3 class="h3">Torneo</h3>
  <input class="input" placeholder="ID torneo" type="text" bind:value={$tournament} />
</label>

<ul class="my-6">
  {#each $clubs as club (club)}
    <li class="p-2 flex justify-between">
      {club}
      <button
        class="btn-icon btn-icon-sm variant-filled-primary [&>*]:pointer-events-none text-white"
        type="button"
        on:click={() => handleRemove(club)}><Delete /></button
      >
    </li>
    <hr />
  {/each}
</ul>

<h3 class="h3">Cancella dati</h3>
<button
  class="btn variant-ringed mt-1 gap-2"
  type="button"
  on:click|preventDefault={() => modalStore.trigger(modal)}><Delete />Cancella tutto</button
>
