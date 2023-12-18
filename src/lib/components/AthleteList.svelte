<script lang="ts">
  import type { Judoka } from '../types/Judoka';

  export let athletes: Judoka[];
  export let iconAction: ((id: string) => void) | undefined = undefined;
</script>

{#if athletes.length > 0}
  <h2 class="h2">Judoka</h2>
{/if}
<ul class="list my-2 mt-5">
  {#each athletes as athlete (athlete.id)}
    <li>
      <span class="flex-auto">{athlete.name}</span>
      {#if iconAction !== undefined}
        <button
          type="button"
          class="btn-icon variant-filled-primary [&>*]:pointer-events-none text-white"
          on:click={() => iconAction?.(athlete.id)}><slot name="icon" /></button
        >
      {/if}
    </li>
    <hr />
  {/each}
  <div class="card p-4 variant-filled-secondary" data-popup="popupHover">
    <p>Hover Content</p>
    <div class="arrow variant-filled-secondary" />
  </div>
</ul>
