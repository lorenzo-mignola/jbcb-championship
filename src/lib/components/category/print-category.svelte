<script lang="ts" strictEvents>
  import { mapFinalsToRounds } from '../../models/categories/doublePool/map-finals-to-rounds';
  import { isNotByeMatch } from '../../models/ranking/category';
  import { formatTimeString } from '../../store/$timer';
  import type { Category } from '../../types/category.type';
  import AthleteList from '../athlete-list.svelte';
  import MatchesPrint from '../print/matches-print.svelte';
  import Brackets from './stats/brackets.svelte';
  import Ranking from './stats/ranking.svelte';
  import RankingDoublePool from './stats/ranking-double-pool.svelte';

  export let category: Category;
</script>

<div>
  <h1 class="h1 mb-4 font-bold">{category.name}</h1>

  <AthleteList athletes={category.athletes} />

  <div class="my-2 mt-4 flex break-inside-avoid-page gap-2">
    <p>Durata incontri:</p>
    <span>{formatTimeString(category.duration)}</span>
  </div>

  <div class="break-inside-avoid-page">
    <h2 class="h3 mt-4">Classifica</h2>
    <Ranking {category} />
  </div>

  {#if category.type === 'double_pool'}
    <div class="break-inside-avoid-page">
      <h2 class="h3 mt-4">Classifica pool</h2>
      <RankingDoublePool {category} />
    </div>

    <div class="break-inside-avoid-page">
      <h2 class="h3 mt-4">Tabellone finale</h2>
      <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
    </div>
  {/if}

  <div class="break-inside-avoid-page overflow-y-scroll">
    <h2 class="h3 mt-4">Incontri</h2>
    <MatchesPrint
      categoryDuration={category.duration}
      matches={category.matches.filter(isNotByeMatch)}
    />
  </div>

  {#if category.type === 'brackets'}
    <div class="break-inside-avoid-page">
      <h2 class="h3 mt-4">Tabellone</h2>
      <Brackets rounds={category.rounds} />
    </div>
  {/if}
</div>
