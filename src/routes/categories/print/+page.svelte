<script lang='ts'>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  import PrintButton from '#lib/components/print-button.svelte';
  import { isMobile } from '#lib/utils/mobile';

  import PrintCategory from './components/print-category.svelte';

  const { data } = $props();

  onMount(() => {
    if (browser && !isMobile()) {
      window.print();
    }
  });
</script>

<div class='
  mb-10 flex justify-between
  print:hidden
'>
  <h1 class='h1 font-bold'>Tutte le categorie</h1>
  <PrintButton />
</div>

<div class='space-y-16'>
  {#each data.categories as category (category.id)}
    <div class='break-after-page'>
      <PrintCategory {category} />
    </div>
  {/each}
</div>
