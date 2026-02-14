<script lang='ts'>
  import { Accordion } from '@skeletonlabs/skeleton-svelte';

  import type { Category } from '$lib/types/category.type';

  import Brackets from '$lib/components/brackets.svelte';
  import Matches from '$lib/components/stats/matches.svelte';
  import RankingDoublePool from '$lib/components/stats/ranking-double-pool.svelte';
  import Ranking from '$lib/components/stats/ranking.svelte';
  import { mapFinalsToRounds } from '$lib/models/categories/doublePool/map-finals-to-rounds';

  interface Props {
    category: Category;
  }

  const { category }: Props = $props();

  let value = $state<string[]>([]);
</script>

<div class='card p-2'>
  <Accordion {value} onValueChange={details => (value = details.value)} multiple>
    <Accordion.Item value='ranking'>
      <h3>
        <Accordion.ItemTrigger class='flex items-center gap-2'>
          <span>🏆</span>
          Classifica
        </Accordion.ItemTrigger>
      </h3>
      <Accordion.ItemContent>
        <Ranking {category} />
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value='matches'>
      <h3>
        <Accordion.ItemTrigger class='flex items-center gap-2'>
          <span>📣</span>
          Incontri
        </Accordion.ItemTrigger>
      </h3>
      <Accordion.ItemContent>
        <Matches categoryDuration={category.duration} matches={category.matches} />
      </Accordion.ItemContent>
    </Accordion.Item>

    {#if category.type === 'double_pool'}
      <Accordion.Item value='double_pool_pool'>
        <h3>
          <Accordion.ItemTrigger class='flex items-center gap-2'>
            <span>📈</span>
            Classifica pool
          </Accordion.ItemTrigger>
        </h3>
        <Accordion.ItemContent>
          <RankingDoublePool {category} />
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value='double_pool_finals'>
        <h3>
          <Accordion.ItemTrigger class='flex items-center gap-2'>
            <span>📊</span>
            Tabellone finale
          </Accordion.ItemTrigger>
        </h3>
        <Accordion.ItemContent>
          <Brackets rounds={mapFinalsToRounds(category)} showRepechage={false} />
        </Accordion.ItemContent>
      </Accordion.Item>
    {/if}

    {#if category.type === 'brackets'}
      <Accordion.Item value='brackets'>
        <h3>
          <Accordion.ItemTrigger class='flex items-center gap-2'>
            <span>📊</span>
            Tabellone
          </Accordion.ItemTrigger>
        </h3>
        <Accordion.ItemContent>
          <Brackets rounds={category.rounds} />
        </Accordion.ItemContent>
      </Accordion.Item>
    {/if}
  </Accordion>
</div>
