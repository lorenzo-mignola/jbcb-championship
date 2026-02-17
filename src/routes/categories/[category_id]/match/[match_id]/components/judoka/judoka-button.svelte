<script lang='ts'>
  import IpponShortcut from '$lib/components/shortcuts/ippon-shortcut.svelte';
  import OsaekomiShortcut from '$lib/components/shortcuts/osaekomi-shortcut.svelte';
  import ShidoShortcut from '$lib/components/shortcuts/shido-shortcut.svelte';
  import WazariShortcut from '$lib/components/shortcuts/wazari-shortcut.svelte';
  import YukoShortcut from '$lib/components/shortcuts/yuko-shortcut.svelte';
  import HandRaisedBack from '$lib/icons/hand-raised-back.svelte';
  import HandRaised from '$lib/icons/hand-raised.svelte';
  import IndexPointing from '$lib/icons/index-pointing.svelte';
  import PalmDown from '$lib/icons/palm-down.svelte';
  import { matchState } from '$lib/state/match/match-state.svelte';
  import { osaekomiState } from '$lib/state/match/osaekomi-state.svelte';
  import { timerState } from '$lib/state/match/timer-state.svelte';
  import { getOpponentType } from '$lib/utils/judoka-utils';

  import PointButton from './point-button.svelte';

  interface Props {
    end: boolean;
    type: 'white' | 'blue';
  }

  const { end, type }: Props = $props();

  const isOsaekomi = $derived(osaekomiState.type === type);
  const disableButton = $derived(end || getOpponentType(type) === osaekomiState.type);
  const disableOsaekomi = $derived(
    (disableButton || !timerState.isPlaying) && !osaekomiState.isExtraTime,
  );

  const ippon = () => matchState.ippon(type);
  const wazari = () => matchState.wazari(type);
  const shido = () => matchState.shido(type);
  const yuko = () => matchState.yuko(type);
  const oasekomi = () => {
    if (osaekomiState.type) {
      osaekomiState.type = null;
      return;
    }
    osaekomiState.type = type;
  };
</script>

<PointButton action={ippon} disabled={disableButton}>
  <HandRaised /> Ippon
  {#snippet shortcut()}
    <IpponShortcut callback={ippon} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={wazari} disabled={disableButton}>
  <PalmDown /> Waza-ari
  {#snippet shortcut()}
    <WazariShortcut callback={wazari} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={yuko} disabled={disableButton}>
  <span class='rotate-45'><PalmDown /></span> Yuko
  {#snippet shortcut()}
    <YukoShortcut callback={yuko} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={shido} disabled={disableButton}>
  <IndexPointing /> Shido
  {#snippet shortcut()}
    <ShidoShortcut callback={shido} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={oasekomi} active={isOsaekomi} disabled={disableOsaekomi}>
  <span class='rotate-180'><HandRaisedBack /></span>
  {isOsaekomi ? 'Toketa' : 'Osae-komi'}
  {#snippet shortcut()}
    <OsaekomiShortcut callback={oasekomi} disabled={disableOsaekomi} {type} />
  {/snippet}
</PointButton>
