<script lang="ts" strictEvents>
  import HandRaised from '../../../icons/hand-raised.svelte';
  import HandRaisedBack from '../../../icons/hand-raised-back.svelte';
  import IndexPointing from '../../../icons/index-pointing.svelte';
  import PalmDown from '../../../icons/palm-down.svelte';
  import IpponShortcut from '../../../shortcuts/ippon-shortcut.svelte';
  import OsaekomiShortcut from '../../../shortcuts/osaekomi-shortcut.svelte';
  import ShidoShortcut from '../../../shortcuts/shido-shortcut.svelte';
  import WazariShortcut from '../../../shortcuts/wazari-shortcut.svelte';
  import { ippon, shido, wazari } from '../../../store/$match';
  import { isPlaying } from '../../../store/$timer';
  import type { JudokaType } from '../../../types/match.type';
  import { getOpponentType } from '../../../utils/judoka';
  import { isExtraTime, oseakomiType } from '../../osaekomi/$osaekomi-timer';
  import PointButton from './point-button.svelte';

  interface Props {
    type: JudokaType;
    end: boolean;
  }

  let { type, end }: Props = $props();

  let isOsaekomi = $derived($oseakomiType === type);
  let disableButton = $derived(end || getOpponentType(type) === $oseakomiType);
  let disableOsaekomi = $derived((disableButton || !$isPlaying) && !$isExtraTime);

  const oasekomiAction = () => {
    if ($oseakomiType) {
      oseakomiType.set(null);
      return;
    }
    oseakomiType.set(type);
  };
</script>

<PointButton action={() => ippon(type)} disabled={disableButton}>
  <HandRaised /> Ippon
  {#snippet shortcut()}
    <IpponShortcut callback={() => ippon(type)} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={() => wazari(type)} disabled={disableButton}>
  <PalmDown /> Waza-ari
  {#snippet shortcut()}
    <WazariShortcut callback={() => wazari(type)} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={() => shido(type)} disabled={disableButton}>
  <IndexPointing /> Shido
  {#snippet shortcut()}
    <ShidoShortcut callback={() => shido(type)} disabled={disableButton} {type} />
  {/snippet}
</PointButton>

<PointButton action={oasekomiAction} active={isOsaekomi} disabled={disableOsaekomi}>
  <span class="rotate-180"><HandRaisedBack /></span>
  {isOsaekomi ? 'Toketa' : 'Osae-komi'}
  {#snippet shortcut()}
    <OsaekomiShortcut callback={oasekomiAction} disabled={disableOsaekomi} {type} />
  {/snippet}
</PointButton>
