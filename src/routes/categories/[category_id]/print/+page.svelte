<script lang='ts'>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import PrintButton from '$lib/components/print-button.svelte';
  import { isMobile } from '$lib/utils/mobile';

  import PrintCategory from '../../print/components/print-category.svelte';

  const { data } = $props();
  const category = $derived(data.category);

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class='
  mb-10
  print:hidden
'>
  <PrintButton />
</div>

{#if category}
  <PrintCategory {category} />
{/if}
