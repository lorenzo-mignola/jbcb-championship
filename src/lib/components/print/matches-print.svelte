<script lang="ts" strictEvents>
  import { formatTime } from '../../store/$timer';
  import type { Match } from '../../types/match.type';
  import MatchRow from './match-row.svelte';

  export let matches: Match[];
  export let categoryDuration: number;

  const formatWithDuration = formatTime(categoryDuration);
</script>

<table class="table table-hover">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Ippon</th>
      <th>Waza-ari</th>
      <th>Shido</th>
      <th>Tempo</th>
    </tr>
  </thead>
  <tbody>
    {#each matches as match, index (match.id)}
      <tr>
        <MatchRow judoka={match.white} />
        <td class="time" rowspan="2">{formatWithDuration(match.finalTime, match.goldenScore)}</td>
      </tr>
      <tr>
        <MatchRow judoka={match.blue} />
      </tr>
      {#if index !== matches.length - 1}
        <tr class="spacer"></tr>
      {/if}
    {/each}
  </tbody>
</table>

<style lang="postcss">
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
