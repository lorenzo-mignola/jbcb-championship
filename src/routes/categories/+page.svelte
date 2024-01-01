<script lang="ts">
  import { goto } from '$app/navigation';
  import { deleteAll, getAllCategories } from '$lib/db/methods';
  import Check from '$lib/icons/check.svelte';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: 'confirm',
    title: 'Cancellare tutte le categorie?',
    body: 'Procedendo tutti i dati inseriti verranno cancellati',
    buttonTextConfirm: 'Cancella categorie',
    buttonTextCancel: 'Annulla',
    response: (confirmDelete: boolean) => {
      if (!confirmDelete) {
        return;
      }
      deleteAll();
      goto('/');
    }
  };

  const categories = getAllCategories();
</script>

<div class="flex flex-col gap-3">
  {#each categories as category (category.id)}
    <a href={`/categories/${category.id}`}>
      <button
        type="button"
        class="btn w-full text-xl p-4"
        class:variant-filled-primary={category.currentMatch}
        class:variant-ghost-primary={!category.currentMatch}
      >
        {category.name}
        {#if !category.currentMatch}
          <span class="ml-2">
            <Check />
          </span>
        {/if}
      </button>
    </a>
  {:else}
    <h3 class="h3">Nessuna categoria creata</h3>
  {/each}

  <button class="btn variant-ringed mt-10" on:click={() => modalStore.trigger(modal)}
    >Cancella tutto</button
  >
</div>
