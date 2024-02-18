<script lang="ts" strictEvents>
  import { browser } from '$app/environment';
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Brackets from '$lib/components/category/stats/brackets.svelte';
  import RankingDoublePool from '$lib/components/category/stats/ranking-double-pool.svelte';
  import Ranking from '$lib/components/category/stats/ranking.svelte';
  import PrintButton from '$lib/components/print-button.svelte';
  import MatchesPrint from '$lib/components/print/matches-print.svelte';
  import { mapFinalsToRounds } from '$lib/models/categories/doublePool/map-finals-to-rounds';
  import { isNotByeMatch } from '$lib/models/ranking/category';
  import { formatTimeString } from '$lib/store/$timer';
  import { isMobile } from '$lib/utils/mobile';
  import { onMount } from 'svelte';

  export let data;
  const category = data.category;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="mb-10 print:hidden">
  <PrintButton />
</div>

{#if category}
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

    <div class="break-inside-avoid-page">
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
{/if}
