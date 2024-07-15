<script lang="ts" strictEvents>
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

  import Delete from '$lib/icons/delete.svelte';

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

<div class="flex flex-col gap-8">
  <div>
    <h3 class="h3">Club</h3>
    <form class="mb-2" on:submit|preventDefault={handleAdd}>
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

    <ul>
      {#each $clubs as club (club)}
        <li class="flex justify-between p-2">
          {club}
          <button
            class="variant-filled-primary btn-icon btn-icon-sm text-white [&>*]:pointer-events-none"
            type="button"
            on:click={() => handleRemove(club)}><Delete /></button
          >
        </li>
        <hr />
      {/each}
    </ul>
  </div>

  <div>
    <label class="label mb-2">
      <h3 class="h3">Torneo</h3>
      <input class="input" placeholder="ID torneo" type="text" bind:value={$tournament} />
    </label>
    <a
      class="variant-ringed btn"
      href={`/categories/print?tournament=${$tournament}`}
      rel="noopener noreferrer"
      target="_blank">🖨️ Stampa tutte le categorie</a
    >
  </div>

  <div>
    <h3 class="h3">Visualizzazione incontro</h3>
    <a class="variant-ringed btn" href="/view" target="_blank">🤝 Apri pagina</a>
  </div>

  <div>
    <h3 class="h3">Cancella dati</h3>
    <button
      class="variant-ringed btn mt-1 gap-2"
      type="button"
      on:click|preventDefault={() => modalStore.trigger(modal)}>🗑️ Cancella tutto</button
    >
  </div>
</div>

<style lang="postcss">
  .h3 {
    @apply mb-1;
  }
</style>
