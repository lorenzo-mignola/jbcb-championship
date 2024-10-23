<script lang="ts" strictEvents>
  import { match, removeIppon, removeShido, removeWazari } from '../../../store/$match';
  import type { JudokaType, MatchJudoka } from '../../../types/match.type';
  import { getOpponentType } from '../../../utils/judoka';
  import PointButton from './point-button.svelte';

  interface Props {
    athlete: MatchJudoka | undefined;
    type: JudokaType;
    toggleEdit: () => void;
  }

  let { athlete, type, toggleEdit }: Props = $props();
  let winner = $derived($match?.winner);
</script>

{#if athlete?.ippon}
  <PointButton
    action={() => {
      removeIppon(type);
      toggleEdit();
    }}
    active>🚫 Ippon</PointButton
  >
{/if}
{#if athlete?.wazari}
  <PointButton
    action={() => {
      removeWazari(type);
      toggleEdit();
    }}
    active>🚫 Waza-ari</PointButton
  >
{/if}
{#if athlete?.shido}
  <PointButton
    action={() => {
      removeShido(type);
      toggleEdit();
      const opponentType = getOpponentType(type);
      if (winner === opponentType) {
        removeIppon(opponentType);
      }
    }}
    active>🚫 Shido</PointButton
  >
{/if}
