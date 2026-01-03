<script lang='ts'>
  import type { Match } from '$lib/types/match.type';

  import { isNotByeMatch } from '../../models/ranking/category';
  import { formatTime } from '../../utils/timer-utils';

  interface Props {
    categoryDuration: number;
    matches: Match[];
  }

  const { categoryDuration, matches }: Props = $props();

  const formatWithDuration = $derived(formatTime(categoryDuration));

  function openMatch(
    event: MouseEvent & {
      currentTarget: EventTarget & HTMLTableRowElement;
    },
    matchId: string,
  ) {
    if (!event.altKey) {
      return;
    }
    window.open(`${window.location.pathname}/match/${matchId}`, '_blank');
  }
</script>

<div class='table-wrap'>
  <table class='table'>
    <thead>
      <tr class="">
        <th class='judoka-white'>Nome</th>
        <th class='judoka-white'>Ippon</th>
        <th class='judoka-white'>Waza-ari</th>
        <th class='judoka-white'>Shido</th>
        <th class='judoka-blue'>Ippon</th>
        <th class='judoka-blue'>Waza-ari</th>
        <th class='judoka-blue'>Shido</th>
        <th class='judoka-blue'>Nome</th>
        <th class='text-center'>Tempo</th>
      </tr>
    </thead>
    <tbody>
      {#each matches.filter(isNotByeMatch) as match (match.id)}
        <tr
          class='hover:brightness-95'
          data-match-id={match.id}
          onclick={(event) => {
            event.stopImmediatePropagation();

            openMatch(event, match.id);
          }}
        >
          <td class='judoka-white' class:font-extrabold={match.winner === 'white'}
          >{match.white?.name ?? '-'}</td
          >
          <td class='judoka-white'>{match.white?.ippon || ''}</td>
          <td class='judoka-white'>{match.white?.wazari || ''}</td>
          <td class='judoka-white'>{match.white?.shido || ''}</td>
          <td class='judoka-blue'>{match.blue?.ippon || ''}</td>
          <td class='judoka-blue'>{match.blue?.wazari || ''}</td>
          <td class='judoka-blue'>{match.blue?.shido || ''}</td>
          <td class='judoka-blue' class:font-extrabold={match.winner === 'blue'}
          >{match.blue?.name ?? ''}</td
          >
          <td class='
            bg-surface-200 text-black
            dark:bg-surface-700 dark:text-white
          '
          >{formatWithDuration(match.finalTime, match.goldenScore)}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang='postcss'>
  @reference "tailwindcss";

  th,
  tr {
    @apply text-center;
  }
  th {
    @apply font-medium!;
  }

  .judoka-blue {
    @apply border-b border-gray-300;
  }
</style>
