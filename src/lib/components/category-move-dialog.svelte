<script lang='ts'>
  import {
    createToaster,
    Dialog,
    Listbox,
    Portal,
    Toast,
    useListCollection,
  } from '@skeletonlabs/skeleton-svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  import { moveJudokaCommand } from '#lib/remote/judoka.remote';

  import {
    originalCategoryIdState,
  } from '../state/category-edit/original-cateogry-id-state.svelte';
  import { tournamentState } from '../state/settings/tournament-state';
  import { categoriesNotStartedState } from '../state/utils/categories-not-started-state.svelte';

  interface Props {
    athleteId: string;
    closeDialog: () => void;
  }

  const { athleteId, closeDialog }: Props = $props();

  const collection = $derived(
    useListCollection({
      items: categoriesNotStartedState.categoriesNotStarted,
      itemToString: item => item.name,
      itemToValue: item => item.id,
    }),
  );

  let newCategoryId = $state<string[]>([]);

  const toaster = createToaster();

  async function onFormSubmit() {
    if (!newCategoryId.length || !newCategoryId[0]) {
      return;
    }

    try {
      const data = await moveJudokaCommand({
        judokaId: athleteId,
        newCategoryId: newCategoryId[0],
        originalCategoryId: originalCategoryIdState.id,
      });

      closeDialog();
      originalCategoryIdState.id = data.originalCategoryId;

      const editUrl = new URL(
        resolve('/categories/[category_id]/edit', {
          category_id: data.originalCategoryId,
        }),
        window.location.origin,
      );
      editUrl.searchParams.set('tournament', tournamentState.tournament);

      await goto(editUrl, {
        refreshAll: true,
        replaceState: true,
      });
    } catch (error) {
      toaster.error({ title: 'Errore durante la modifica delle categorie' });

      console.error(error);
    }
  }
</script>

<Portal>
  <Dialog.Backdrop class='fixed inset-0 z-50 bg-surface-50-950/50' />
  <Dialog.Positioner class='
    fixed inset-0 z-50 flex items-center justify-center p-4
  '>
    <Dialog.Content class='
      w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl
    '>
      <div class='space-y-4 card p-4'>
        <header class='text-2xl font-bold'>
          <Dialog.Title>
            Seleziona categoria
          </Dialog.Title>
        </header>
        <Dialog.Description>
          {#if collection.items.length > 0}
            <Listbox
              class='rounded-container'
              {collection}
              value={newCategoryId}
              onValueChange={details => newCategoryId = details.value}
            >
              <Listbox.Content>
                {#each collection.items as item (item.id)}
                  <Listbox.Item {item}>
                    <Listbox.ItemText>{item.name}</Listbox.ItemText>
                    <Listbox.ItemIndicator />
                  </Listbox.Item>
                {/each}
              </Listbox.Content>
            </Listbox>
          {:else}
            <p class='py-4 text-center text-surface-600-400 italic'>
              Nessuna altra categoria non iniziata disponibile
            </p>
          {/if}
        </Dialog.Description>

        <footer class='flex justify-end gap-2'>
          <Dialog.CloseTrigger class='btn preset-outlined'>
            Annulla
          </Dialog.CloseTrigger>
          <button
            class='btn preset-filled'
            disabled={!newCategoryId.length}
            type='button'
            onclick={(e) => {
              e.preventDefault();
              onFormSubmit();
            }}>Sposta judoka</button
          >
        </footer>
      </div>
    </Dialog.Content>
  </Dialog.Positioner>
</Portal>

<Toast.Group {toaster}>
  {#snippet children(toast)}
    <Toast {toast}>
      <Toast.Message>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
      </Toast.Message>
      <Toast.CloseTrigger />
    </Toast>
  {/snippet}
</Toast.Group>
