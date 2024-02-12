<script lang="ts" strictEvents>
  import type { Judoka } from '../types/judoka.type';

  interface $$Slots {
    icon: Record<string, never>;
  }

  export let athletes: Judoka[];
  // eslint-disable-next-line no-unused-vars -- type declaration
  export let iconAction: ((id: string) => void) | undefined;
</script>

{#if athletes.length > 0}
  <h2 class="h3">Judoka</h2>
{/if}
<ul class="list my-2">
  {#each athletes as athlete (athlete.id)}
    <hr />
    <li>
      <span class="flex flex-auto flex-col">
        <span class="text-lg">{athlete.name}</span>
        {#if athlete.club}
          <span class="italic">{athlete.club}</span>
        {/if}
      </span>
      {#if iconAction !== undefined}
        <button
          class="variant-filled-primary btn-icon text-white [&>*]:pointer-events-none"
          type="button"
          on:click|preventDefault={() => iconAction?.(athlete.id)}><slot name="icon" /></button
        >
      {/if}
    </li>
  {/each}

  {#if athletes.length > 0}
    <hr />
  {/if}
</ul>
