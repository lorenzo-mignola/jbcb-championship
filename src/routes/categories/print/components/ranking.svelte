<script lang='ts'>
  import type { Category } from '$lib/types/category.type';

  import { getRanking } from '$lib/models/ranking/category';

  import Rank from './rank.svelte';

  interface Props {
    category: Category;
    compact?: boolean;
  }

  const { category, compact = false }: Props = $props();
  const ranking = $derived.by(() => getRanking(category).filter((rank) => {
    if (!compact) {
      return true;
    }
    return rank.rank <= 4;
  }));
</script>

{#if ranking.length === 0}
  <p class='italic'>La categoria non è ancora terminata</p>
{:else}
  <ul>
    {#each ranking as rankingAthlete (rankingAthlete.id)}
      <li class='flex justify-between py-1'>
        <Rank
          name={category.athletes.find(athlete => athlete.id === rankingAthlete.id)?.name}
          club={category.athletes.find(athlete => athlete.id === rankingAthlete.id)?.club}
          rank={rankingAthlete.rank}
        />
        {#if !compact && (
          rankingAthlete.matchPoint !== undefined || rankingAthlete.evaluationPoint !== undefined
        )}
          <span>{rankingAthlete.matchPoint}/{rankingAthlete.evaluationPoint}</span>
        {/if}
      </li>
      <hr />
    {/each}
  </ul>
{/if}
