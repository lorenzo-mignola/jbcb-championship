<script lang='ts'>
  import type { Match } from '$lib/types/match.type';

  import MatchRow from '$lib/components/stats/match-row.svelte';
  import { formatTime } from '$lib/utils/timer-utils';

  interface Props {
    categoryDuration: number;
    matches: Match[];
  }

  const { categoryDuration, matches }: Props = $props();

  const formatWithDuration = $derived(formatTime(categoryDuration));
</script>

<table class='table'>
  <thead>
    <tr>
      <th>Nome</th>
      <th class='text-center'>Ippon</th>
      <th class='text-center'>Waza-ari</th>
      <th class='text-center'>Shido</th>
      <th class='text-center'>Tempo</th>
    </tr>
  </thead>
  <tbody>
    {#each matches as match, index (match.id)}
      <tr>
        <MatchRow judoka={match.white} winner={match.winner === 'white'} />
        <!-- eslint-disable-next-line better-tailwindcss/no-unregistered-classes -->
        <td class='time text-center' rowspan='2'
        >{formatWithDuration(match.finalTime, match.goldenScore)}</td
        >
      </tr>
      <tr>
        <MatchRow judoka={match.blue} winner={match.winner === 'blue'} />
      </tr>
      {#if index !== matches.length - 1}
        <!-- eslint-disable-next-line better-tailwindcss/no-unregistered-classes -->
        <tr class='spacer'></tr>
      {/if}
    {/each}
  </tbody>
</table>

<style lang='postcss'>
  .time {
    vertical-align: middle;
  }
  .spacer {
    height: 10px;
  }

  td,
  th {
    padding: 0.5rem !important;
  }
</style>
