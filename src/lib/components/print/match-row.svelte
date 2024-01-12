<script lang="ts" strictEvents>
  import type { MatchJudoka } from '../../types/match.type';

  export let judoka: MatchJudoka | undefined;
  export let winner: boolean;
</script>

<td class:font-extrabold={winner}>{judoka?.name ?? '-'}</td>
<td class="text-center">{judoka?.ippon || ''}</td>
<td class="text-center">{judoka?.wazari || ''}</td>
<td class="text-center">{judoka?.shido || ''}</td>

<style lang="postcss">
  td {
    padding: 0.5rem !important;
  }
</style>
