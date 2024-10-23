<script lang="ts" strictEvents>
  import { preventDefault } from 'svelte/legacy';

  import { browser } from '$app/environment';

  import { categoriesNotStarted } from '../store/$categories-not-started';
  import type { Judoka } from '../types/judoka.type';
  import MoveButton from './move-athlete/move-button.svelte';

  interface $$Slots {
    icon: Record<string, never>;
  }

  interface Props {
    athletes: Judoka[];
    iconActionTitle?: string;
    // eslint-disable-next-line no-unused-vars -- type declaration
    iconAction?: ((id: string) => void) | null;
    showTitle?: boolean;
    icon?: import('svelte').Snippet;
  }

  let {
    athletes,
    iconActionTitle = '',
    iconAction = null,
    showTitle = true,
    icon
  }: Props = $props();

  const editPage = browser ? window.location.href.includes('/edit') : false;
  let edit = $derived(editPage && $categoriesNotStarted.length > 0);
</script>

{#if showTitle && athletes.length > 0}
  <h2 class="h3">Judoka</h2>
{/if}
<ul class="list my-2 break-inside-avoid-page">
  {#each athletes as athlete (athlete.id)}
    <hr />
    <li>
      <span class="flex flex-auto flex-col">
        <span class="text-lg">{athlete.name}</span>
        {#if athlete.club}
          <span class="italic">{athlete.club}</span>
        {/if}
      </span>
      {#if edit}
        <MoveButton athleteId={athlete.id} />
      {/if}
      {#if iconAction !== null}
        <button
          class="variant-filled-primary btn-icon text-white [&>*]:pointer-events-none"
          title={iconActionTitle}
          type="button"
          onclick={preventDefault(() => iconAction?.(athlete.id))}>{@render icon?.()}</button
        >
      {/if}
    </li>
  {/each}

  {#if athletes.length > 0}
    <hr />
  {/if}
</ul>
