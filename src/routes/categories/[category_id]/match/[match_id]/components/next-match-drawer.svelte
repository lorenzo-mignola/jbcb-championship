<script lang='ts'>
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

  import type { Match } from '#lib/types/match.type';

  import LoadingSpinner from '#lib/components/loading-spinner.svelte';
  import { getNextMatchesQuery } from '#lib/remote/categories.remote';

  interface Props {
    categoryId: string;
  }

  const { categoryId }: Props = $props();
  let matches = $state<Match[]>([]);
  let loading = $state(false);

  async function onOpenChange(detail: { open: boolean }) {
    if (detail.open) {
      loading = true;
      try {
        matches = await getNextMatchesQuery(categoryId);
      } finally {
        loading = false;
      }
    } else {
      matches = [];
    }
  }
</script>

<Dialog onOpenChange={onOpenChange}>
  <Dialog.Trigger
    class='mt-2 btn w-full preset-filled shadow-md btn-sm'
    data-testId='drawer-next-matches'
  >
    ⏭️ Prossimi incontri
  </Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class='
      fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete
    ' />
    <Dialog.Positioner class='fixed inset-0 z-50 flex justify-end'>
      <Dialog.Content class='
        h-screen w-sm space-y-4 card bg-surface-100-900 p-4 shadow-xl
      '>
        <header>
          <Dialog.Title class='text-2xl font-bold'>
            <h3 class='h3'>Prossimi incontri</h3>
            <hr class='my-3' />
          </Dialog.Title>
        </header>

        {#if loading}
          <div class='flex justify-center p-4'>
            <LoadingSpinner />
          </div>
        {:else}
          <article class='
            col-auto mt-3 grid
            lg:grid-cols-3
          '>
            {#each matches as nextMatch (nextMatch.id)}
              <li class='list-none'>
                <div class='mx-2 mb-3 flex flex-col'>
                  <span class='judoka-white mb-1 rounded-sm p-1'>{nextMatch.white?.name}</span>
                  <span class='judoka-blue mb-1 rounded-sm p-1'>{nextMatch.blue?.name}</span>
                </div>
              </li>
            {/each}
          </article>
        {/if}
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
