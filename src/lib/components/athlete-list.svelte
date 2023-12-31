<script lang="ts">
  import type { Judoka } from '../types/Judoka';

  export let athletes: Judoka[];
  export let iconAction: ((id: string) => void) | undefined = undefined;
</script>

{#if athletes.length > 0}
  <h2 class="h3">Judoka</h2>
{/if}
<ul class="list my-2">
  {#each athletes as athlete (athlete.id)}
    <hr />
    <li>
      <span class="flex flex-auto flex-col">
        <span class="text-xl">{athlete.name}</span>
        {#if athlete.club}
          <span class="italic">{athlete.club}</span>
        {/if}
      </span>
      {#if iconAction !== undefined}
        <button
          type="button"
          class="btn-icon variant-filled-primary [&>*]:pointer-events-none text-white"
          on:click={() => iconAction?.(athlete.id)}><slot name="icon" /></button
        >
      {/if}
    </li>
  {/each}
  <hr />
</ul>
