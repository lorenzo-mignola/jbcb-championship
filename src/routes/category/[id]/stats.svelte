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
              {#each category.rounds as round (round.id)}
                <tr>
                  <td class="judoka-white">{round.white.name}</td>
                  <td class="judoka-white">{round.white.ippon}</td>
                  <td class="judoka-white">{round.white.wazari}</td>
                  <td class="judoka-white">{round.white.shido}</td>
                  <td class="judoka-blue">{round.blue.name}</td>
                  <td class="judoka-blue">{round.blue.ippon}</td>
                  <td class="judoka-blue">{round.blue.wazari}</td>
                  <td class="judoka-blue">{round.blue.shido}</td>
                  <td>{round.finalTime}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
