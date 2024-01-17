<script lang="ts" strictEvents>
  import Check from '$lib/icons/check.svelte';

  export let data;
</script>

<div class="flex flex-col gap-3">
  {#each data.categories as category (category.id)}
    <a
      data-sveltekit-preload-code="hover"
      data-sveltekit-preload-data="tap"
      href={`/categories/${category.id}`}
    >
      <button
        class="btn card card-hover w-full text-xl p-4"
        class:variant-filled-primary={category.currentMatch}
        class:variant-ghost-primary={!category.currentMatch}
        type="button"
      >
        {category.name}
        {#if !category.currentMatch}
          <span class="ml-2">
            <Check />
          </span>
        {/if}
      </button>
    </a>
  {:else}
    <h3 class="h3">Nessuna categoria creata</h3>
  {/each}
</div>
