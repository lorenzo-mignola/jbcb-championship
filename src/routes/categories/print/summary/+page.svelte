<script lang="ts" strictEvents>
  import { browser } from '$app/environment';
  import PrintCategoryRankingOnly from '$lib/components/category/print-category-ranking-only.svelte';
  import PrintCategory from '$lib/components/category/print-category.svelte';
  import PrintButton from '$lib/components/print-button.svelte';
  import { isMobile } from '$lib/utils/mobile';
  import { SlideToggle } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  export let data;
  const categories = data.categories;

  let rankingOnly = false;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="mb-8 flex justify-between print:hidden">
  <SlideToggle name="rankingOnly" bind:checked={rankingOnly}>Stampa solo classifica</SlideToggle>
  <PrintButton />
</div>
{#each categories as category (category.id)}
  {#if rankingOnly}
    <PrintCategoryRankingOnly {category} />
  {:else}
    <div class="break-after-page">
      <PrintCategory {category} />
    </div>
  {/if}
{/each}
