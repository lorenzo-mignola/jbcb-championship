<script lang="ts" strictEvents>
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import { mapFinalsToRounds } from '../../../models/categories/doublePool/map-finals-to-rounds';
  import type { Category } from '../../../types/category.type';
  import Brackets from './brackets.svelte';
  import Matches from './matches.svelte';
  import RankingDoublePool from './ranking-double-pool.svelte';
  import Ranking from './ranking.svelte';

  export let category: Category;
</script>

<div class="card p-2">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="lead">🏆</svelte:fragment>
      <svelte:fragment slot="summary">Classifica</svelte:fragment>
      <svelte:fragment slot="content">
        <Ranking {category} />
      </svelte:fragment>
    </AccordionItem>

    <AccordionItem>
      <svelte:fragment slot="lead">📣</svelte:fragment>
      <svelte:fragment slot="summary">Incontri</svelte:fragment>
      <svelte:fragment slot="content">
        <Matches categoryDuration={category.duration} matches={category.matches} />
      </svelte:fragment>
    </AccordionItem>

    {#if category.type === 'double_pool'}
      <AccordionItem>
        <svelte:fragment slot="lead">📈</svelte:fragment>
        <svelte:fragment slot="summary">Classifica pool</svelte:fragment>
        <svelte:fragment slot="content">
          <RankingDoublePool {category} />
        </svelte:fragment>
      </AccordionItem>

      <AccordionItem>
        <svelte:fragment slot="lead">📊</svelte:fragment>
        <svelte:fragment slot="summary">Tabellone finale</svelte:fragment>
        <svelte:fragment slot="content">
          <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
        </svelte:fragment>
      </AccordionItem>
    {/if}

    {#if category.type === 'brackets'}
      <AccordionItem>
        <svelte:fragment slot="lead">📊</svelte:fragment>
        <svelte:fragment slot="summary">Tabellone</svelte:fragment>
        <svelte:fragment slot="content">
          <Brackets rounds={category.rounds} />
        </svelte:fragment>
      </AccordionItem>
    {/if}
  </Accordion>
</div>
