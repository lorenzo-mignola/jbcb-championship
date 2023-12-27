<script lang="ts">
  import type { JudokaType, MatchJudoka } from '../../../../../../lib/types/Match';
  import { getOpponentType } from '../../../../../../lib/utils/judoka';
  import { match, removeIppon, removeShido, removeWazari } from '../store/$match';
  import PointButton from './point-button.svelte';

  export let athlete: MatchJudoka | undefined;
  export let type: JudokaType;
  export let toggleEdit: () => void;
</script>

{#if athlete?.ippon}
  <PointButton
    active
    action={() => {
      removeIppon(type);
      toggleEdit();
    }}>🚫 Ippon</PointButton
  >
{/if}
{#if athlete?.wazari}
  <PointButton
    active
    action={() => {
      removeWazari(type);
      toggleEdit();
    }}>🚫 Waza-ari</PointButton
  >
{/if}
{#if athlete?.shido}
  <PointButton
    active
    action={() => {
      removeShido(type);
      toggleEdit();
      const opponentType = getOpponentType(type);
      if ($match?.winner && opponentType) {
        removeIppon(opponentType);
      }
    }}>🚫 Shido</PointButton
  >
{/if}
