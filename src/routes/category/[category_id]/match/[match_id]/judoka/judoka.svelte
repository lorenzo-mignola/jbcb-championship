<script lang="ts">
  import { ippon, match, shido, wazari } from '../$match';
  import { isPlaying } from '../$timer';
  import Edit from '../../../../../../icons/edit.svelte';
  import {
    oseakomiType,
    timerOsaekomi
  } from '../../../../../../lib/components/osaekomi/$osaekomi-timer';
  import type { JudokaType } from '../../../../../../lib/types/Match';
  import { getOpponentType } from '../../../../../../lib/utils/judoka';
  import PointButton from './point-button.svelte';

  export let type: 'white' | 'blue';
  $: athlete = $match?.[type];
  $: end = Boolean($match?.winner);

  export let setWinner: (type: JudokaType) => void;
  export let setDisqualification: (type: JudokaType) => void;

  $: points = () => {
    if (athlete?.ippon) {
      return 10;
    }
    if (athlete?.wazari === 2) {
      return 10;
    }
    return athlete?.wazari || 0;
  };

  $: {
    if (points() === 10 && !end) {
      setWinner(type);
    }
    if (athlete?.shido === 3 && !end) {
      setDisqualification(type);
    }
  }

  $: isOsaekomi = $oseakomiType === type;
  $: disableButton = end || getOpponentType(type) === $oseakomiType;

  const ipponAction = () => {
    ippon(type);
  };

  const wazariAction = () => {
    wazari(type);
  };

  const oasekomiAction = () => {
    if ($oseakomiType) {
      oseakomiType.set(null);
      return;
    }
    const osaekomiDuration = athlete?.wazari === 1 ? 15 : 20;
    timerOsaekomi.set(osaekomiDuration);
    oseakomiType.set(type);
  };

  timerOsaekomi.subscribe((time) => {
    if (!athlete) {
      return;
    }
    if ($oseakomiType !== type) {
      return;
    }
    if (time === null || time > 0) {
      return;
    }
    if (athlete.wazari === 1) {
      wazariAction();
    } else {
      ipponAction();
    }
  });

  const shidoAction = () => {
    shido(type);
  };
</script>

<div class:judoka-white-card={type === 'white'} class:judoka-blue-card={type === 'blue'}>
  <div class="flex justify-between">
    <span>{athlete?.name ?? '-'}</span>
    {#if athlete}
      <span>
        {#if athlete.shido === 3}
          <span class="mr-1">🟥</span>
        {:else}
          <!--  eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each { length: athlete.shido } as _}
            <span class="mr-1">🟨</span>
          {/each}
        {/if}
        <span class="points">{points()}</span>
      </span>
    {/if}
  </div>
  <hr class="divider" />
  <div class="flex justify-between items-center">
    <div>
      <PointButton action={ipponAction} disabled={disableButton}>✋ Ippon</PointButton>
      <PointButton action={wazariAction} disabled={disableButton}>🫳 Waza-ari</PointButton>
      <PointButton action={shidoAction} disabled={disableButton}>👉 Shido</PointButton>
      <PointButton
        action={oasekomiAction}
        disabled={disableButton || !$isPlaying}
        active={isOsaekomi}
        ><span class="rotate-180">🤚</span> {isOsaekomi ? 'Toketa' : 'Osae-komi'}</PointButton
      >
    </div>
    <div>
      {#if athlete}
        {#if points() > 0 || athlete.shido > 0}
          <button type="button" class="btn-icon btn-icon-sm md:btn-icon variant-soft text-inherit"
            ><Edit /></button
          >
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .points {
    letter-spacing: 0.8rem;
  }
</style>
