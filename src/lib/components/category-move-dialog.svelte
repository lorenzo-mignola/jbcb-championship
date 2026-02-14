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
