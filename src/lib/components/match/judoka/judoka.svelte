<script lang="ts">
  import Edit from '$lib/icons/edit.svelte';
  import { match } from '$lib/store/$match';
  import { bluePoints, whitePoints } from '$lib/store/judokaPoints';
  import { watchWinnerOrLoser } from '$lib/store/winner-loser';
  import { watchTimerOsaekomi } from '../../osaekomi/$osaekomi-timer';
  import JudokaButtonEdit from './judoka-button-edit.svelte';
  import JudokaButton from './judoka-button.svelte';

  export let type: 'white' | 'blue';
  $: athlete = $match?.[type];

  $: points = type === 'white' ? whitePoints : bluePoints;

  let edit = false;

  const toggleEdit = () => {
    edit = !edit;
  };

  watchTimerOsaekomi(type);
  watchWinnerOrLoser(type);
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
        <span class="points">{$points}</span>
      </span>
    {/if}
  </div>
  <hr class="divider" />
  <div class="flex justify-between items-center">
    <div>
      {#if !edit}
        <JudokaButton {type} end={Boolean($match?.winner)} />
      {:else}
        <JudokaButtonEdit {athlete} {type} {toggleEdit} />
      {/if}
    </div>
    <div>
      {#if athlete}
        {#if $points > 0 || athlete.shido > 0}
          <button
            type="button"
            class="btn-icon btn-icon-sm md:btn-icon text-inherit"
            class:variant-filled-warning={edit}
            class:variant-ringed-surface={!edit}
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
