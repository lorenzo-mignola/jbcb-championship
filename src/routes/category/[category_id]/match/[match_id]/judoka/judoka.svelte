<script lang="ts">
  import Edit from '../../../../../../icons/edit.svelte';
  import type { JudokaType, MatchJudoka } from '../../../../../../lib/types/Match';
  import PointButton from './point-button.svelte';

  export let type: 'white' | 'blue';
  export let athlete: MatchJudoka;
  export let setWinner: (type: JudokaType) => void;
  export let setDisqualification: (type: JudokaType) => void;
  export let end: boolean;

  let oasekomi = false;

  $: points = () => {
    if (athlete.ippon) {
      return athlete.ippon;
    }
    if (athlete.wazari === 2) {
      return 10;
    }
    return athlete.wazari;
  };

  $: {
    if (points() === 10 && !end) {
      setWinner(type);
    }
    if (athlete.shido === 3 && !end) {
      setDisqualification(type);
    }
  }

  const ipponAction = () => {
    athlete.ippon = 10;
  };

  const wazariAction = () => {
    athlete.wazari += 1;
  };

  const oasekomiAction = () => {
    oasekomi = true;
  };

  const shidoAction = () => {
    athlete.shido += 1;
  };
</script>

<div class:judoka-white-card={type === 'white'} class:judoka-blue-card={type === 'blue'}>
  <div class="flex justify-between">
    <span>{athlete.name}</span>
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
  </div>
  <hr class="divider" />
  <div class="flex justify-between items-center">
    <div>
      <PointButton action={ipponAction} disabled={end}>✋ Ippon</PointButton>
      <PointButton action={wazariAction} disabled={end}>🫳 Waza-ari</PointButton>
      <PointButton action={oasekomiAction} disabled={end || oasekomi}
        ><span class="rotate-180">🤚</span> Osaekomi</PointButton
      >
      <PointButton action={shidoAction} disabled={end}>👉 Shido</PointButton>
    </div>
    {#if points() > 0 || athlete.shido > 0}
      <div>
        <button type="button" class="btn-icon variant-soft text-inherit"><Edit /></button>
      </div>
    {/if}
  </div>
</div>

<style>
  .points {
    letter-spacing: 0.8rem;
  }
</style>
