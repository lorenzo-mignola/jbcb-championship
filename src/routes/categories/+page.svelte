<script lang='ts'>
  import Check from '$lib/icons/check.svelte';

  import Search from '../../lib/icons/search.svelte';

  const { data } = $props();

  let searchValue = $state('');

  const categories = $derived.by(() => {
    if (!searchValue) {
      return data.categories;
    }
    return data.categories.filter(category =>
      category.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  });
</script>
<div class='mb-4 input-group grid-cols-[auto_1fr_auto]'>
  <div class='ig-cell preset-tonal'>
    <Search />
  </div>
  <input placeholder='Cerca...' type='search' bind:value={searchValue} class='
    ig-input
  ' />
</div>

<div class='flex flex-col gap-3'>
  {#each categories as category (category.id)}
    <a
      data-sveltekit-preload-code='hover'
      data-sveltekit-preload-data='tap'
      href={`/categories/${category.id}`}
    >
      <button
        class='btn w-full card p-4 text-xl'
        class:preset-filled-primary-500={category.currentMatch}
        class:notCurrentMatch={!category.currentMatch}
        type='button'
      >
        {category.name}
        {#if !category.currentMatch}
          <span class='ml-2'>
            <Check />
          </span>
        {/if}
      </button>
    </a>
  {:else}
    <h3 class='h3'>Nessuna categoria creata</h3>
  {/each}
</div>

<style lang='postcss'>
  @reference "tailwindcss";
  @reference '@skeletonlabs/skeleton';

  .notCurrentMatch {
    @apply border border-primary-500;
    @apply preset-tonal-primary border border-primary-500;
  }
  </style>
