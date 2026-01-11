<script lang='ts'>
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ky from 'ky';

  import type { Category } from '$lib/types/category.type';
  import type { Match } from '$lib/types/match.type';

  import LoadingSpinner from '$lib/components/loading-spinner.svelte';
  import { getByeWinner } from '$lib/models/categories/brackets/auto-update-next-match';
  import { isByeMatch } from '$lib/models/ranking/category';
  import { localStorageMatchState } from '$lib/state/match/local-storage-match-state.svelte';
  import { matchState } from '$lib/state/match/match-state.svelte';
  import { toaster } from '$lib/state/utils/toaster-state';

  import { reset } from '../../../edit/reset';

  interface Props {
    categoryId: string;
  }

  const { categoryId }: Props = $props();
  let loading = $state(false);

  const save = async (matchToUpdate: Match) => {
    loading = true;
    try {
      const categoryUpdated = await ky.patch<Category | undefined>(
        `/api/categories/${categoryId}/match`,
        {
          json: {
            matchToUpdate,
          },
        },
      ).json();

      if (!categoryUpdated) {
        loading = false;
        return;
      }
      if (categoryUpdated.currentMatch) {
        reset();
        goto(resolve(`/categories/${categoryUpdated.id}/match/${categoryUpdated.currentMatch}`), {
          invalidateAll: true,
        });
        loading = false;
        return;
      }
      reset();
      goto(resolve(`/categories/${categoryUpdated.id}`), {
        invalidateAll: true,
      });
    } catch (error) {
      console.error((error as { data: any }).data);
      toaster.error({
        title: 'Errore durante il salvataggio dell\'incontro',
      });
      localStorageMatchState.errorMatches.push(matchToUpdate);
    }
    loading = false;
  };

  $effect(() => {
    const match = matchState.match;
    if (!match) {
      return;
    }
    const isBye = isByeMatch(match);
    if (isBye) {
      const byeWinner = getByeWinner(match);
      save({ ...match, winner: byeWinner });
    }
  });

  const handleClick = () => {
    const match = matchState.match;
    if (!match) {
      return;
    }
    save(match);
  };

  const winner = $derived(matchState.match?.winner);
</script>

<button
  class='
    mt-5 btn flex w-full items-end preset-filled-secondary-500 p-5 text-2xl
  '
  class:hidden={!winner}
  disabled={loading}
  type='button'
  onclick={(e) => {
    e.preventDefault();
    handleClick();
  }}
>
  <span class='ml-2'> Termina incontro </span>
  {#if loading}
    <LoadingSpinner />
  {/if}
</button>
