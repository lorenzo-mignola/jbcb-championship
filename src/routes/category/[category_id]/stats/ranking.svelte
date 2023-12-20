<script lang="ts">
  import { getRanking } from '$lib/utils/category';
  import Rank from '../../../../lib/components/Rank.svelte';
  import type { Category } from '../../../../lib/types/Category';

  export let category: Category;
  const ranking = getRanking(category);
</script>

<ul>
  {#each ranking as rankingAthlete}
    <li class="flex justify-between py-1">
      <Rank
        rank={rankingAthlete.rank}
        name={category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.name}
      />
      <span>{rankingAthlete.matchPoint}/{rankingAthlete.evaluationPoint}</span>
    </li>
    <hr />
  {/each}
</ul>
