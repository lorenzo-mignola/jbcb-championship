<script lang="ts">
  import type { Match } from '../../../../lib/types/Match';
  import { isByeMatch } from '../../../../lib/utils/category';
  import { formatTime } from '../match/[match_id]/$timer';

  export let matches: Match[];
</script>

<div class="table-container">
  <table class="table table-hover text-center">
    <thead>
      <tr>
        <th class="judoka-white text-center">Nome</th>
        <th class="judoka-white text-center">Ippon</th>
        <th class="judoka-white text-center">Waza-ari</th>
        <th class="judoka-white text-center">Shido</th>
        <th class="judoka-blue text-center">Ippon</th>
        <th class="judoka-blue text-center">Waza-ari</th>
        <th class="judoka-blue text-center">Shido</th>
        <th class="judoka-blue text-center">Nome</th>
        <th class="text-center">Tempo</th>
      </tr>
    </thead>
    <tbody>
      {#each matches.filter((match) => !isByeMatch(match)) as match}
        <tr class="row">
          <td class="judoka-white">{match.white?.name ?? '-'}</td>
          <td class="judoka-white">{match.white?.ippon || ''}</td>
          <td class="judoka-white">{match.white?.wazari || ''}</td>
          <td class="judoka-white">{match.white?.shido || ''}</td>
          <td class="judoka-blue">{match.blue?.ippon || ''}</td>
          <td class="judoka-blue">{match.blue?.wazari || ''}</td>
          <td class="judoka-blue">{match.blue?.shido || ''}</td>
          <td class="judoka-blue">{match.blue?.name ?? ''}</td>
          <td>{match.finalTime !== null ? formatTime(match.finalTime) : '-'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
