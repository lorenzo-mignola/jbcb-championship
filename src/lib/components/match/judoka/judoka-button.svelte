<script lang="ts">
  import { ippon, shido, wazari } from '../../../store/$match';
  import { isPlaying } from '../../../store/$timer';
  import type { JudokaType } from '../../../types/Match';
  import { getOpponentType } from '../../../utils/judoka';
  import { oseakomiType } from '../../osaekomi/$osaekomi-timer';
  import PointButton from './point-button.svelte';

  export let type: JudokaType;
  export let end: boolean;

  $: isOsaekomi = $oseakomiType === type;
  $: disableButton = end || getOpponentType(type) === $oseakomiType;

  const oasekomiAction = () => {
    if ($oseakomiType) {
      oseakomiType.set(null);
      return;
    }
    oseakomiType.set(type);
  };
</script>

<PointButton action={() => ippon(type)} disabled={disableButton}>✋ Ippon</PointButton>
<PointButton action={() => wazari(type)} disabled={disableButton}>🫳 Waza-ari</PointButton>
<PointButton action={() => shido(type)} disabled={disableButton}>👉 Shido</PointButton>
<PointButton action={oasekomiAction} disabled={disableButton || !$isPlaying} active={isOsaekomi}
  ><span class="rotate-180">🤚</span> {isOsaekomi ? 'Toketa' : 'Osae-komi'}</PointButton
>
