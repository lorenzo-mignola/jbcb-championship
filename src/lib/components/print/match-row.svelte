<script lang="ts">
  import type { MatchJudoka } from '../../types/Match';

  export let judoka: MatchJudoka | undefined;
</script>

<td>{judoka?.name ?? '-'}</td>
<td>{judoka?.ippon || ''}</td>
<td>{judoka?.wazari || ''}</td>
<td>{judoka?.shido || ''}</td>

<style>
  td {
    padding: 0.5rem !important;
  }
</style>
