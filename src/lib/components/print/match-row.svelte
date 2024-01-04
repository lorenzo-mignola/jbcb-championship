<script lang="ts" strictEvents>
  import type { MatchJudoka } from '../../types/match.type';

  export let judoka: MatchJudoka | undefined;
</script>

<td>{judoka?.name ?? '-'}</td>
<td>{judoka?.ippon || ''}</td>
<td>{judoka?.wazari || ''}</td>
<td>{judoka?.shido || ''}</td>

<style lang="postcss">
  td {
    padding: 0.5rem !important;
  }
</style>
