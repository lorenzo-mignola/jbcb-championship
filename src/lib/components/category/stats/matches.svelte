<script lang="ts" strictEvents>
  import { isByeMatch } from '../../../models/ranking/category';
  import { formatTime } from '../../../store/$timer';
  import type { Match } from '../../../types/match.type';

  export let matches: Match[];
  export let categoryDuration: number;

  const formatWithDuration = formatTime(categoryDuration);

  function openMatch(
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLTableRowElement;
    },
    matchId: string
  ) {
    if (!event.altKey) {
      return;
    }
    window.open(`${window.location.pathname}/match/${matchId}`, '_blank');
  }
</script>

<div class="table-container">
  <table class="table table-hover">
    <thead>
      <tr class="">
        <th class="judoka-white">Nome</th>
        <th class="judoka-white">Ippon</th>
        <th class="judoka-white">Waza-ari</th>
        <th class="judoka-white">Shido</th>
        <th class="judoka-blue">Ippon</th>
        <th class="judoka-blue">Waza-ari</th>
        <th class="judoka-blue">Shido</th>
        <th class="judoka-blue">Nome</th>
        <th class="text-center">Tempo</th>
      </tr>
    </thead>
    <tbody>
      {#each matches.filter((match) => !isByeMatch(match)) as match (match.id)}
        <tr
          class="row hover:brightness-95"
          data-match-id={match.id}
          on:click|stopImmediatePropagation={(event) => openMatch(event, match.id)}
        >
          <td class="judoka-white" class:font-extrabold={match.winner === 'white'}
            >{match.white?.name ?? '-'}</td
          >
          <td class="judoka-white">{match.white?.ippon || ''}</td>
          <td class="judoka-white">{match.white?.wazari || ''}</td>
          <td class="judoka-white">{match.white?.shido || ''}</td>
          <td class="judoka-blue">{match.blue?.ippon || ''}</td>
          <td class="judoka-blue">{match.blue?.wazari || ''}</td>
          <td class="judoka-blue">{match.blue?.shido || ''}</td>
          <td class="judoka-blue" class:font-extrabold={match.winner === 'blue'}
            >{match.blue?.name ?? ''}</td
          >
          <td class="bg-surface-200 dark:bg-surface-700 text-black dark:text-white"
            >{formatWithDuration(match.finalTime, match.goldenScore)}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  th,
  tr {
    @apply text-center;
  }
  th {
    @apply !font-medium;
  }

  .judoka-blue {
    @apply border-b border-gray-300;
  }
</style>
