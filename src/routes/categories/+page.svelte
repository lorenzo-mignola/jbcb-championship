<script lang="ts" strictEvents>
  import Check from '$lib/icons/check.svelte';

  import Search from '../../lib/icons/search.svelte';

  export let data;

  let searchValue = '';

  $: categories = searchValue
    ? data.categories.filter((category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : data.categories;
</script>

<div class="input-group input-group-divider mb-4 grid-cols-[auto_1fr_auto]">
  <div class="input-group-shim"><Search /></div>
  <input placeholder="Cerca..." type="search" bind:value={searchValue} />
</div>

<div class="flex flex-col gap-3">
  {#each categories as category (category.id)}
    <a
      data-sveltekit-preload-code="hover"
      data-sveltekit-preload-data="tap"
      href={`/categories/${category.id}`}
    >
      <button
        class="card btn card-hover w-full p-4 text-xl"
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
