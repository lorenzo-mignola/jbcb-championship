<script lang="ts" strictEvents>
  import { SlideToggle } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  import { browser } from '$app/environment';
  import PrintCategory from '$lib/components/category/print-category.svelte';
  import PrintCategoryRankingOnly from '$lib/components/category/print-category-ranking-only.svelte';
  import PrintButton from '$lib/components/print-button.svelte';
  import { isMobile } from '$lib/utils/mobile';

  export let data;
  const categories = data.categories;

  let fullReport = false;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="mb-8 flex justify-between print:hidden">
  <SlideToggle name="rankingOnly" bind:checked={fullReport}>Classifiche complete</SlideToggle>
  <PrintButton />
</div>

{#each categories as category (category.id)}
  {#if fullReport}
    <div class="break-after-page">
      <PrintCategory {category} />
    </div>
  {:else}
    <PrintCategoryRankingOnly {category} />
  {/if}
{/each}
