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
  import { base } from '$app/paths';
  import ky from 'ky';

  import { categoriesNotStartedState } from '../state/categories-not-started-state.svelte';
  import { originalCategoryIdState } from '../state/original-cateogry-id-state.svelte';
  import { tournamentState } from '../state/tournament-state';

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
    if (!newCategoryId.length) {
      return;
    }

    try {
      const data = await ky.patch<{ originalCategoryId: string; newCategoryId: string }>(
        '/api/athletes',
        {
          json: {
            athlete: athleteId,
            newCategory: newCategoryId,
            originalCategory: originalCategoryIdState.id,
          },
        },
      ).json();

      closeDialog();
      originalCategoryIdState.id = data.originalCategoryId;

      const editUrl = new URL(
        `${base}/categories/${data.originalCategoryId}/edit`,
      );
      editUrl.searchParams.set('tournament', tournamentState.tournament);

      await goto(editUrl, {
        invalidateAll: true,
        replaceState: true,
      });
    } catch (error) {
      toaster.error({ title: 'Errore durante la modifica delle categorie' });

      console.error((error as { data: any }).data);
    }
  }
</script>

<Portal>
  <Dialog.Backdrop class='fixed inset-0 z-50 bg-surface-50-950/50' />
  <Dialog.Positioner class='fixed inset-0 z-50 flex justify-center items-center p-4'>
    <Dialog.Content class='card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl'>
      <div class='card w-modal space-y-4 p-4 shadow-xl'>
        <header class='text-2xl font-bold'>
          <Dialog.Title>
            Seleziona categoria
          </Dialog.Title>
        </header>
        <Dialog.Description>
          <Listbox
            class='border border-surface-500 p-4 rounded-container'
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
        </Dialog.Description>

        <footer class='modal-footer'>
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
