<script lang='ts'>
  import type { Category } from '$lib/types/category.type';

  import AthleteList from '$lib/components/athlete-list.svelte';
  import Brackets from '$lib/components/brackets.svelte';
  import RankingDoublePool from '$lib/components/stats/ranking-double-pool.svelte';
  import Ranking from '$lib/components/stats/ranking.svelte';
  import { mapFinalsToRounds } from '$lib/models/categories/doublePool/map-finals-to-rounds';
  import { isNotByeMatch } from '$lib/models/ranking/category';
  import { formatTimeString } from '$lib/utils/timer-utils';

  import PrintMatches from './print-matches.svelte';

  interface Props {
    category: Category;
  }

  const { category }: Props = $props();
</script>

<div>
  <h1 class='mb-4 h1 font-bold'>{category.name}</h1>

  <AthleteList athletes={category.athletes} />

  <div class='my-2 mt-4 flex break-inside-avoid-page gap-2'>
    <p>Durata incontri:</p>
    <span>{formatTimeString(category.duration)}</span>
  </div>

  <div class='break-inside-avoid-page'>
    <h2 class='mt-4 h3'>Classifica</h2>
    <Ranking {category} />
  </div>

  {#if category.type === 'double_pool'}
    <div class='break-inside-avoid-page'>
      <h2 class='mt-4 h3'>Classifica pool</h2>
      <RankingDoublePool {category} />
    </div>

    <div class='break-inside-avoid-page'>
      <h2 class='mt-4 h3'>Tabellone finale</h2>
      <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
    </div>
  {/if}

  <div class='break-inside-avoid-page overflow-y-scroll'>
    <h2 class='mt-4 h3'>Incontri</h2>
    <PrintMatches
      categoryDuration={category.duration}
      matches={category.matches.filter(isNotByeMatch)}
    />
  </div>

  {#if category.type === 'brackets'}
    <div class='break-inside-avoid-page'>
      <h2 class='mt-4 h3'>Tabellone</h2>
      <Brackets rounds={category.rounds} />
    </div>
  {/if}
</div>
