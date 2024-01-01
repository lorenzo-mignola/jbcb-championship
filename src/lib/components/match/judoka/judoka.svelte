<script lang="ts">
  import Edit from '$lib/icons/edit.svelte';
  import { match } from '$lib/store/$match';
  import { bluePoints, whitePoints } from '$lib/store/judokaPoints';
  import { watchWinnerOrLoser } from '$lib/store/winner-loser';
  import { watchTimerOsaekomi } from '../../osaekomi/$osaekomi-timer';
  import JudokaButtonEdit from './judoka-button-edit.svelte';
  import JudokaButton from './judoka-button.svelte';
  import JudokaNameAndPoints from './judoka-name-and-points.svelte';

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
  <JudokaNameAndPoints {athlete} points={$points} />
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
            class:active={edit}
            class:variant-ringed-surface={!edit}
            on:click={toggleEdit}><Edit /></button
          >
        {/if}
      {/if}
    </div>
  </div>
</div>
