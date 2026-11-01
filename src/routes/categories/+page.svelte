<script lang='ts'>
  import { resolve } from '$app/paths';

  import Check from '#lib/icons/check.svelte';

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
<div class='mb-4 field-group grid-cols-[auto_1fr_auto]'>
  <div class='label preset-tonal'>
    <Search />
  </div>
  <input class='input' placeholder='Cerca...' type='search' bind:value={searchValue} />
</div>

<div class='flex flex-col gap-3'>
  {#each categories as category (category.id)}
    <a
      data-sveltekit-preload-code='hover'
      data-sveltekit-preload-data='tap'
      href={resolve('/categories/[category_id]', { category_id: category.id })}
    >
      <button
        class='btn w-full card p-4 text-xl'
        class:preset-filled-primary-500={category.currentMatch}
        class:local-notCurrentMatch={!category.currentMatch}
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

  .local-notCurrentMatch {
    @apply border border-primary-500;
    @apply preset-tonal-primary border border-primary-500;
  }
  </style>
