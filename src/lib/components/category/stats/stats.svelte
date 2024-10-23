<script lang="ts" strictEvents>
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  import { mapFinalsToRounds } from '../../../models/categories/doublePool/map-finals-to-rounds';
  import type { Category } from '../../../types/category.type';
  import Brackets from './brackets.svelte';
  import Matches from './matches.svelte';
  import Ranking from './ranking.svelte';
  import RankingDoublePool from './ranking-double-pool.svelte';

  interface Props {
    category: Category;
  }

  let { category }: Props = $props();
</script>

<div class="card p-2">
  <Accordion>
    <AccordionItem>
      {#snippet lead()}
        🏆
      {/snippet}
      {#snippet summary()}
        Classifica
      {/snippet}
      {#snippet content()}
        <Ranking {category} />
      {/snippet}
    </AccordionItem>

    <AccordionItem>
      {#snippet lead()}
        📣
      {/snippet}
      {#snippet summary()}
        Incontri
      {/snippet}
      {#snippet content()}
        <Matches categoryDuration={category.duration} matches={category.matches} />
      {/snippet}
    </AccordionItem>

    {#if category.type === 'double_pool'}
      <AccordionItem>
        {#snippet lead()}
          📈
        {/snippet}
        {#snippet summary()}
          Classifica pool
        {/snippet}
        {#snippet content()}
          <RankingDoublePool {category} />
        {/snippet}
      </AccordionItem>

      <AccordionItem>
        {#snippet lead()}
          📊
        {/snippet}
        {#snippet summary()}
          Tabellone finale
        {/snippet}
        {#snippet content()}
          <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
        {/snippet}
      </AccordionItem>
    {/if}

    {#if category.type === 'brackets'}
      <AccordionItem>
        {#snippet lead()}
          📊
        {/snippet}
        {#snippet summary()}
          Tabellone
        {/snippet}
        {#snippet content()}
          <Brackets rounds={category.rounds} />
        {/snippet}
      </AccordionItem>
    {/if}
  </Accordion>
</div>
