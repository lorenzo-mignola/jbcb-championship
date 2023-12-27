<script lang="ts">
  import { disqualification, ippon, match, wazari, winner } from '../$match';
  import Edit from '../../../../../../icons/edit.svelte';
  import {
    oseakomiType,
    timerOsaekomi
  } from '../../../../../../lib/components/osaekomi/$osaekomi-timer';
  import JudokaButtonEdit from './judoka-button-edit.svelte';
  import JudokaButton from './judoka-button.svelte';

  export let type: 'white' | 'blue';
  $: athlete = $match?.[type];

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
    const end = Boolean($match?.winner);
    if (points() === 10 && !end) {
      winner(type);
    }
    if (athlete?.shido === 3 && !end) {
      disqualification(type);
    }
  }

  let edit = false;

  const toggleEdit = () => {
    edit = !edit;
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
      wazari(type);
    } else {
      ippon(type);
    }
  });
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
      {#if !edit}
        <JudokaButton {athlete} {type} end={Boolean($match?.winner)} />
      {:else}
        <JudokaButtonEdit {athlete} {type} {toggleEdit} />
      {/if}
    </div>
    <div>
      {#if athlete}
        {#if points() > 0 || athlete.shido > 0}
          <button
            type="button"
            class="btn-icon btn-icon-sm md:btn-icon text-inherit"
            class:variant-filled-primary={edit}
            class:variant-ghost={!edit}
            on:click={toggleEdit}><Edit /></button
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
