<script lang='ts'>
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import Delete from '$lib/icons/delete.svelte';

  import { settingsState } from '../../lib/state/settings-state.svelte';
  import { tournamentState } from '../../lib/state/tournament-state';

  let club = $state('');

  function handleAdd() {
    if (!club) {
      return;
    }
    settingsState.addClub(club);
    club = '';
  }

  function handleRemove(clubToRemove: string) {
    if (!clubToRemove) {
      return;
    }
    settingsState.removeClub(clubToRemove);
  }
</script>

<h2 class='h2 mb-8'>Impostazioni</h2>

<div class='flex flex-col gap-8'>
  <div>
    <h3 class='h3'>Club</h3>
    <form
      class='mb-2'
      onsubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}>
      <div class='input-group input-group-divider grid-cols-[1fr_auto]'>
        <label class='label'>
          <input class='input' placeholder='Nome club' type='text' bind:value={club} />
        </label>
        <button
          class='variant-filled-primary'
          disabled={!club}
          type='button'
          onclick={handleAdd}>Aggiungi</button
        >
      </div>
    </form>

    <ul>
      {#each settingsState.clubs as club (club)}
        <li class='flex justify-between p-2'>
          {club}
          <button
            class='variant-filled-primary btn-icon btn-icon-sm text-white *:pointer-events-none'
            type='button'
            onclick={() => handleRemove(club)}><Delete /></button
          >
        </li>
        <hr />
      {/each}
    </ul>
  </div>

  <div>
    <label class='label mb-2'>
      <h3 class='h3'>Torneo</h3>
      <input
        class='input'
        placeholder='ID torneo'
        type='text'
        bind:value={tournamentState.tournament}
      />
    </label>
    <a
      class='preset-outlined btn'
      href={`/categories/print?tournament=${tournamentState.tournament}`}
      rel='noopener noreferrer'
      target='_blank'>🖨️ Stampa tutte le categorie</a
    >
  </div>

  <div>
    <h3 class='h3'>Visualizzazione incontro</h3>
    <a class='preset-outlined btn' href='/view' target='_blank'>🤝 Apri pagina</a>
  </div>

  <div>
    <h3 class='h3'>Cancella dati</h3>
    <Dialog>
      <Dialog.Trigger class='preset-outlined btn mt-1 gap-2'>🗑️ Cancella tutto</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class='fixed inset-0 z-50 bg-surface-50-950/50' />
        <Dialog.Positioner class='fixed inset-0 z-50 flex justify-center items-center p-4'>
          <Dialog.Content class='card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl'>
            <header class='flex justify-between items-center'>
              <Dialog.Title class='text-lg font-bold'>Cancellare i dati?</Dialog.Title>
            </header>
            <Dialog.Description>
              Procedendo tutti i dati locali verranno cancellati
            </Dialog.Description>
            <footer class='flex justify-end gap-2'>
              <Dialog.CloseTrigger class='btn preset-tonal'>Annulla</Dialog.CloseTrigger>
              <button
                type='button'
                class='btn preset-filled'
                onclick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}>Cancella dati</button>
            </footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  </div>
</div>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .h3 {
    @apply mb-1;
  }
</style>
