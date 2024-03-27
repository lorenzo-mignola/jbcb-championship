<script lang="ts" strictEvents>
  import Edit from '$lib/icons/edit.svelte';
  import { match } from '$lib/store/$match';
  import { bluePoints, whitePoints } from '$lib/store/judoka-points';
  import { watchWinnerOrLoser } from '$lib/store/winner-loser';
  import { onDestroy } from 'svelte';
  import { timerWatch } from '../../../store/$timer';
  import { watchTimerOsaekomi } from '../../osaekomi/$osaekomi-timer';
  import JudokaButtonEdit from './judoka-button-edit.svelte';
  import JudokaButton from './judoka-button.svelte';
  import JudokaNameAndPoints from './judoka-name-and-points.svelte';

  export let type: 'white' | 'blue';
  $: athlete = $match?.[type];

  $: points = type === 'white' ? whitePoints : bluePoints;
  $: winner = $match?.winner;

  let edit = false;
  const unsubscribe: (() => void)[] = [];

  onDestroy(() => {
    unsubscribe.forEach((fn) => fn());
  });

  const toggleEdit = () => {
    edit = !edit;
  };

  unsubscribe.push(watchTimerOsaekomi(type));
  unsubscribe.push(timerWatch());
  unsubscribe.push(watchWinnerOrLoser(type));
</script>

<div
  class:judoka-blue-card={type === 'blue'}
  class:judoka-white-card={type === 'white'}
  data-testid={`judoka-card-${athlete?.id ?? 'null'}`}
>
  <JudokaNameAndPoints {athlete} points={$points} />
  <hr class="divider" />
  <div class="flex items-center justify-between">
    <div>
      {#if !edit}
        <JudokaButton end={Boolean(winner)} {type} />
      {:else}
        <JudokaButtonEdit {athlete} {toggleEdit} {type} />
      {/if}
    </div>
    <div>
      {#if athlete}
        {#if $points > 0 || athlete.shido > 0}
          <button
            class="btn-icon btn-icon-sm text-inherit md:btn-icon"
            class:active={edit}
            class:variant-ringed-surface={!edit}
            data-testId="edit-point"
            type="button"
            on:click={toggleEdit}><Edit /></button
          >
        {/if}
      {/if}
    </div>
  </div>
</div>
