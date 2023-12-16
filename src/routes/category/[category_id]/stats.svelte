<script lang="ts">
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import Rank from '../../../lib/components/Rank.svelte';
  import type { Category } from '../../../lib/types/Category';
  import type { Match } from '../../../lib/types/Match';
  import { getRanking } from '../../../lib/utils/category';
  import { formatTime } from './match/[match_id]/$timer';

  export let category: Category;
  const ranking = getRanking(category);
  const matches = category.matches.filter((match): match is Match => match !== null);
</script>

<div class="card p-2">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="lead">🏆</svelte:fragment>
      <svelte:fragment slot="summary">Classifica</svelte:fragment>
      <svelte:fragment slot="content">
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
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="lead">📣</svelte:fragment>
      <svelte:fragment slot="summary">Incontri</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="table-container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="judoka-white">Nome</th>
                <th class="judoka-white">Ippon</th>
                <th class="judoka-white">Waza-ari</th>
                <th class="judoka-white">Shido</th>
                <th class="judoka-blue">Ippon</th>
                <th class="judoka-blue">Waza-ari</th>
                <th class="judoka-blue">Shido</th>
                <th class="judoka-blue">Nome</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {#each matches as match (match.id)}
                <tr class="row">
                  <td class="judoka-white">{match.white.name}</td>
                  <td class="judoka-white">{match.white.ippon}</td>
                  <td class="judoka-white">{match.white.wazari}</td>
                  <td class="judoka-white">{match.white.shido}</td>
                  <td class="judoka-blue">{match.blue.ippon}</td>
                  <td class="judoka-blue">{match.blue.wazari}</td>
                  <td class="judoka-blue">{match.blue.shido}</td>
                  <td class="judoka-blue">{match.blue.name}</td>
                  <td>{match.finalTime !== null ? formatTime(match.finalTime) : '-'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>

<style>
  .row:hover {
    filter: brightness(0.95);
  }
  th.judoka-blue {
    border-bottom: 1px solid;
  }
  td.judoka-blue {
    border-bottom: 1px solid;
  }
  td,
  th {
    text-align: center;
  }
</style>
