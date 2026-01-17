<script lang='ts'>
  import Edit from '$lib/icons/edit.svelte';
  import { judokaPointsState } from '$lib/state/match/judoka-points-state.svelte';
  import { matchState } from '$lib/state/match/match-state.svelte';

  import JudokaButtonEdit from './judoka-button-edit.svelte';
  import JudokaButton from './judoka-button.svelte';
  import JudokaNameAndPoints from './judoka-name-and-points.svelte';

  interface Props {
    type: 'white' | 'blue';
  }

  const { type }: Props = $props();
  const athlete = $derived(matchState.match?.[type]);

  const points = $derived(judokaPointsState[type]);
  const winner = $derived(matchState.match?.winner);

  let edit = $state(false);

  const toggleEdit = () => {
    edit = !edit;
  };

  $effect(() => {
    matchState.watchWinnerOrLoser(type);
  });
</script>

<div
  class:judoka-blue-card={type === 'blue'}
  class:judoka-white-card={type === 'white'}
  data-testid={`judoka-card-${athlete?.id ?? 'null'}`}
>
  <JudokaNameAndPoints {athlete} points={points} />
  <hr class='hr' />
  <div class='flex items-center justify-between'>
    <div data-testId='points-container'>
      {#if !edit}
        <JudokaButton end={Boolean(winner)} {type} />
      {:else}
        <JudokaButtonEdit {athlete} {toggleEdit} {type} />
      {/if}
    </div>
    <div>
      {#if athlete}
        {#if points > 0 || athlete.shido > 0}
          <button
            class='
              btn-icon btn-icon-sm text-inherit
              md:btn-icon
            '
            class:active={edit}
            class:preset-outlined-surface-500={!edit}
            data-testId='edit-point'
            type='button'
            onclick={toggleEdit}><Edit /></button
          >
        {/if}
      {/if}
    </div>
  </div>
</div>
