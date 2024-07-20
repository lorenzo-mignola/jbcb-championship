<script lang="ts" strictEvents>
  import HandRaised from '../../../icons/hand-raised.svelte';
  import HandRaisedBack from '../../../icons/hand-raised-back.svelte';
  import IndexPointing from '../../../icons/index-pointing.svelte';
  import PalmDown from '../../../icons/palm-down.svelte';
  import IpponShortcut from '../../../shortcuts/ippon-shortcut.svelte';
  import { ippon, shido, wazari } from '../../../store/$match';
  import { isPlaying } from '../../../store/$timer';
  import type { JudokaType } from '../../../types/match.type';
  import { getOpponentType } from '../../../utils/judoka';
  import { isExtraTime, oseakomiType } from '../../osaekomi/$osaekomi-timer';
  import PointButton from './point-button.svelte';

  export let type: JudokaType;
  export let end: boolean;

  $: isOsaekomi = $oseakomiType === type;
  $: disableButton = end || getOpponentType(type) === $oseakomiType;
  $: disableOsaekomi = (disableButton || !$isPlaying) && !$isExtraTime;

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
  <svelte:fragment slot="shortcut">
    <IpponShortcut callback={() => ippon(type)} {type} />
  </svelte:fragment>
</PointButton>

<PointButton action={() => wazari(type)} disabled={disableButton}>
  <PalmDown /> Waza-ari
</PointButton>

<PointButton action={() => shido(type)} disabled={disableButton}>
  <IndexPointing /> Shido
</PointButton>

<PointButton action={oasekomiAction} active={isOsaekomi} disabled={disableOsaekomi}>
  <span class="rotate-180"><HandRaisedBack /></span>
  {isOsaekomi ? 'Toketa' : 'Osae-komi'}
</PointButton>
