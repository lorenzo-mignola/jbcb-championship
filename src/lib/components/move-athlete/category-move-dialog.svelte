<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import {
    ListBox,
    ListBoxItem,
    getModalStore,
    getToastStore,
    type ToastSettings
  } from '@skeletonlabs/skeleton';
  import axios from 'redaxios';
  import type { SvelteComponent } from 'svelte';
  import { categoriesNotStarted } from '../../store/$categories-not-started';
  import { tournament } from '../../store/$tournament';

  /** Exposes parent props to this component. */
  export let parent: SvelteComponent;

  let newCategoryId = '';
  const modalStore = getModalStore();

  const modal = $modalStore[0];

  const toastStore = getToastStore();
  const errorToast: ToastSettings = {
    message: 'Errore durante la modifica delle categorie',
    background: 'variant-filled-error'
  };

  async function onFormSubmit() {
    if (!newCategoryId) {
      return;
    }

    const { athleteId, originalCategoryId } = modal.meta;
    try {
      const { data } = await axios.patch<{ originalCategoryId: string; newCategoryId: string }>(
        '/api/athletes',
        {
          originalCategory: originalCategoryId,
          newCategory: newCategoryId,
          athlete: athleteId
        }
      );

      modalStore.close();
      await goto(`/categories/${data.originalCategoryId}/edit?tournament=${$tournament}`, {
        replaceState: true,
        invalidateAll: true
      });
    } catch (error) {
      toastStore.trigger(errorToast);
      // eslint-disable-next-line no-console -- console error
      console.error((error as { data: any }).data);
    }
  }
</script>

{#if modal}
  <div class="card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">Seleziona categoria</header>

    <ListBox class="border border-surface-500 p-4 rounded-container-token">
      {#each $categoriesNotStarted as category (category.id)}
        <ListBoxItem name={category.id} value={category.id} bind:group={newCategoryId}
          >{category.name}</ListBoxItem
        >
      {/each}
    </ListBox>

    <footer class="modal-footer {parent.regionFooter}">
      <button
        class="btn {parent.buttonNeutral}"
        type="button"
        on:click|preventDefault={parent.onClose}>{parent.buttonTextCancel}</button
      >
      <button
        class="btn {parent.buttonPositive}"
        disabled={!newCategoryId}
        type="button"
        on:click|preventDefault={onFormSubmit}>Sposta judoka</button
      >
    </footer>
  </div>
{/if}
