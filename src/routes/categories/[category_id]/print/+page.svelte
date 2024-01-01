<script lang="ts">
  import { browser } from '$app/environment';
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Brackets from '$lib/components/category/stats/brackets.svelte';
  import RankingDoublePool from '$lib/components/category/stats/ranking-double-pool.svelte';
  import Ranking from '$lib/components/category/stats/ranking.svelte';
  import MatchesPrint from '$lib/components/print/matches-print.svelte';
  import Print from '$lib/icons/print.svelte';
  import { mapFinalsToRounds } from '$lib/models/categories/doublePool/mapFinalsToRounds';
  import { formatTimeString } from '$lib/store/$timer';
  import { isByeMatch } from '$lib/utils/category';
  import { isMobile } from '$lib/utils/mobile.js';
  import { onMount } from 'svelte';

  export let data;
  const category = data.category;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="print:hidden mb-10">
  <button type="button" class="btn variant-filled" on:click={() => window.print()}>
    <span><Print /></span>
    <span>Stampa</span>
  </button>
</div>

{#if category}
  <div>
    <h1 class="h1 font-bold mb-4">{category.name}</h1>

    <AthleteList athletes={category.athletes} />

    <div class="flex gap-2 my-2 mt-4">
      <p>Durata incontri:</p>
      <span>{formatTimeString(category.duration)}</span>
    </div>

    <h2 class="h3 mt-4">Classifica</h2>
    <Ranking {category} />

    {#if category.type === 'double-pool'}
      <h2 class="h3 mt-4">Classifica pool</h2>
      <RankingDoublePool {category} />

      <h2 class="h3 mt-4">Tabellone finale</h2>
      <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
    {/if}

    <h2 class="h3 mt-4">Incontri</h2>
    <MatchesPrint
      matches={category.matches.filter((match) => !isByeMatch(match))}
      categoryDuration={category.duration}
    />

    {#if category.type === 'brackets'}
      <h2 class="h3 mt-4">Tabellone</h2>
      <Brackets rounds={category.rounds} />
    {/if}
  </div>
{/if}
