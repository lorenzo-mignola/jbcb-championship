<script lang="ts" strictEvents>
  import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
  import type { SvelteComponent } from 'svelte';
  import { categoriesNotStarted } from '../../store/$categories-not-started';

  /** Exposes parent props to this component. */
  export let parent: SvelteComponent;

  let newCateogryId = '';
  const modalStore = getModalStore();

  // Handle Form Submission
  function onFormSubmit() {
    if ($modalStore[0].response) {
      $modalStore[0].response(newCateogryId);
    }
    modalStore.close();
  }
  const modal = $modalStore[0];
</script>

{#if modal}
  <div class="card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">Seleziona categoria</header>

    <ListBox class="border border-surface-500 p-4 rounded-container-token">
      {#each $categoriesNotStarted as category (category.id)}
        <ListBoxItem name={category.id} value={category.id} bind:group={newCateogryId}
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
        disabled={!newCateogryId}
        type="button"
        on:click|preventDefault={onFormSubmit}>Sposta judoka</button
      >
    </footer>
  </div>
{/if}
