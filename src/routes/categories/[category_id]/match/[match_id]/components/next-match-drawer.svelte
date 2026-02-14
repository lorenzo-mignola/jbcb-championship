<script lang='ts'>
  import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';

  import { nextMatchesState } from '$lib/state/match/next-matches-state.svelte';

</script>

<Dialog>
  <Dialog.Trigger
    class='mt-2 btn w-full preset-filled btn-sm shadow-md'
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

        <article class='
          col-auto mt-3 grid
          lg:grid-cols-3
        '>
          {#each nextMatchesState.nextMatches as nextMatch (nextMatch.id)}
            <li>
              <div class='mx-2 mb-3 flex flex-col'>
                <span class='local-judoka-next judoka-white'>{nextMatch.white?.name}</span>
                <span class='local-judoka-next judoka-blue'>{nextMatch.blue?.name}</span>
              </div>
            </li>
          {/each}
        </article>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>

<style lang='postcss'>
  @reference "tailwindcss";

  .local-judoka-next {
    @apply mb-1 rounded-sm p-1;
  }
</style>
