<script lang='ts'>
  import type { MatchJudoka } from '$lib/types/match.type';

  interface Props {
    judoka: MatchJudoka | undefined;
    winner: boolean;
  }

  const { judoka, winner }: Props = $props();
</script>

<td class:font-extrabold={winner}>{judoka?.name ?? '-'}</td>
<td class='text-center'>{judoka?.ippon || ''}</td>
<td class='text-center'>{judoka?.wazari || ''}</td>
<td class='text-center'>{judoka?.shido || ''}</td>

<style lang='postcss'>
  td {
    padding: 0.5rem !important;
  }
</style>
