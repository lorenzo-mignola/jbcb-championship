<script lang="ts" strictEvents>
  import { browser } from '$app/environment';
  import PrintButton from '$lib/components/print-button.svelte';
  import { isMobile } from '$lib/utils/mobile';
  import { onMount } from 'svelte';
  import PrintCategory from '../../../../lib/components/category/print-category.svelte';

  export let data;
  const category = data.category;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="mb-10 print:hidden">
  <PrintButton />
</div>

{#if category}
  <PrintCategory {category} />
{/if}
