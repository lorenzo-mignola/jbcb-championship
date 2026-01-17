<script lang='ts'>
  import type { JudokaType, MatchJudoka } from '$lib/types/match.type';

  import { matchState } from '$lib/state/match/match-state.svelte';

  import PointButton from './point-button.svelte';

  interface Props {
    athlete: MatchJudoka | undefined;
    toggleEdit: () => void;
    type: JudokaType;
  }

  const { athlete, toggleEdit, type }: Props = $props();

  const removeIppon = () => {
    matchState.removeIppon(type);
    toggleEdit();
  };

  const removeWazari = () => {
    matchState.removeWazari(type);
    toggleEdit();
  };

  const removeShido = () => {
    matchState.removeShido(type);
    toggleEdit();
  };
</script>

{#if athlete?.ippon}
  <PointButton
    action={removeIppon}
    active>🚫 Ippon</PointButton
  >
{/if}
{#if athlete?.wazari}
  <PointButton
    action={removeWazari}
    active>🚫 Waza-ari</PointButton
  >
{/if}
{#if athlete?.shido}
  <PointButton
    action={removeShido}
    active>🚫 Shido</PointButton
  >
{/if}
