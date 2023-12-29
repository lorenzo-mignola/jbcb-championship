<script lang="ts">
  import { formatTime } from '../../store/$timer';
  import type { Match } from '../../types/Match';
  import MatchRow from './match-row.svelte';

  export let matches: Match[];
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
    {#each matches as match, index}
      <tr>
        <MatchRow judoka={match.white} />
        <td rowspan="2" class="time"
          >{match.finalTime !== null ? formatTime(4 * 60 * 10 - match.finalTime) : '-'}</td
        >
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

<style>
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
