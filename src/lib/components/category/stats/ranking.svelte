<script lang="ts">
  import { getRanking } from '$lib/utils/category';
  import Rank from '../../../../lib/components/rank.svelte';
  import type { Category } from '../../../../lib/types/Category';

  export let category: Category;
  const ranking = getRanking(category);
</script>

{#if ranking.length === 0}
  <p class="italic">La categoria non è ancora terminata</p>
{:else}
  <ul>
    {#each ranking as rankingAthlete}
      <li class="flex justify-between py-1">
        <Rank
          rank={rankingAthlete.rank}
          name={category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.name}
          club={category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.club}
        />
        {#if rankingAthlete.matchPoint !== undefined || rankingAthlete.evaluationPoint !== undefined}
          <span>{rankingAthlete.matchPoint}/{rankingAthlete.evaluationPoint}</span>
        {/if}
      </li>
      <hr />
    {/each}
  </ul>
{/if}
