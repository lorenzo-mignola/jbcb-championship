<script lang="ts" strictEvents>
  import { getRanking } from '$lib/models/ranking/category';
  import type { Category } from '../../../types/category.type';
  import Rank from '../../rank.svelte';

  export let category: Category;
  export let compact: boolean = false;
  const ranking = getRanking(category).filter((rank) => {
    if (!compact) {
      return true;
    }
    return rank.rank <= 4;
  });
</script>

{#if ranking.length === 0}
  <p class="italic">La categoria non è ancora terminata</p>
{:else}
  <ul>
    {#each ranking as rankingAthlete (rankingAthlete.id)}
      <li class="flex justify-between py-1">
        <Rank
          name={category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.name}
          club={category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.club}
          rank={rankingAthlete.rank}
        />
        {#if !compact && (rankingAthlete.matchPoint !== undefined || rankingAthlete.evaluationPoint !== undefined)}
          <span>{rankingAthlete.matchPoint}/{rankingAthlete.evaluationPoint}</span>
        {/if}
      </li>
      <hr />
    {/each}
  </ul>
{/if}
