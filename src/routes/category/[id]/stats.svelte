<script lang="ts">
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import type { Category } from '../../../lib/types/Category';

  export let category: Category;
</script>

<div class="card p-2">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="lead">🏆</svelte:fragment>
      <svelte:fragment slot="summary">Classifica</svelte:fragment>
      <svelte:fragment slot="content">
        <ul>
          {#each category.athletes as athlete (athlete.id)}
            <li>{athlete.name} 0</li>
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
              {#each category.matches as match (match.id)}
                <tr class="row">
                  <td class="judoka-white">{match.white.name}</td>
                  <td class="judoka-white">{match.white.ippon}</td>
                  <td class="judoka-white">{match.white.wazari}</td>
                  <td class="judoka-white">{match.white.shido}</td>
                  <td class="judoka-blue">{match.blue.ippon}</td>
                  <td class="judoka-blue">{match.blue.wazari}</td>
                  <td class="judoka-blue">{match.blue.shido}</td>
                  <td class="judoka-blue">{match.blue.name}</td>
                  <td>{match.finalTime ?? '-'}</td>
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
</style>
