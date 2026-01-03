<script lang='ts'>
  import { browser } from '$app/environment';

  import type { Judoka } from '../types/judoka.type';

  import { categoriesNotStartedState } from '../state/categories-not-started-state.svelte';
  import MoveButton from './move-button.svelte';

  interface $$Slots {
    icon: Record<string, never>;
  }

  interface Props {
    athletes: Judoka[];
    icon?: import('svelte').Snippet;
    iconAction?: ((id: string) => void) | null;
    iconActionTitle?: string;
    showTitle?: boolean;
  }

  const {
    athletes,
    icon,
    iconAction = null,
    iconActionTitle = '',
    showTitle = true,
  }: Props = $props();

  const editPage = browser ? window.location.href.includes('/edit') : false;
  const edit = $derived(editPage && categoriesNotStartedState.length() > 0);
</script>

{#if showTitle && athletes.length > 0}
  <h2 class='h4'>Judoka</h2>
{/if}
<ul class='my-2 break-inside-avoid-page'>
  {#each athletes as athlete (athlete.id)}
    <hr />
    <li class='flex p-2'>
      <span class='flex flex-auto flex-col'>
        <span class='text-lg'>{athlete.name}</span>
        {#if athlete.club}
          <span class='italic'>{athlete.club}</span>
        {/if}
      </span>
      {#if edit}
        <MoveButton athleteId={athlete.id} />
      {/if}
      {#if iconAction !== null}
        <button
          class='
            btn-icon preset-filled-primary-500 text-white
            *:pointer-events-none
          '
          title={iconActionTitle}
          type='button'
          onclick={() => iconAction?.(athlete.id)}>{@render icon?.()}</button
        >
      {/if}
    </li>
  {/each}

  {#if athletes.length > 0}
    <hr />
  {/if}
</ul>
