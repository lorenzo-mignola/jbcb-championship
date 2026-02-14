<script lang='ts'>
  import { Switch } from '@skeletonlabs/skeleton-svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import PrintButton from '$lib/components/print-button.svelte';
  import { isMobile } from '$lib/utils/mobile.js';

  import PrintCategoryRankingOnly from '../components/print-category-ranking-only.svelte';
  import PrintCategory from '../components/print-category.svelte';

  const { data } = $props();
  const categories = $derived(data.categories);

  let fullReport = $state(false);

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class='
  mb-8 flex justify-between
  print:hidden
'>
  <Switch
    name='rankingOnly'
    checked={fullReport}
    onCheckedChange={details => (fullReport = details.checked)}
  >
    Classifiche complete</Switch>
  <PrintButton />
</div>

{#each categories as category (category.id)}
  {#if fullReport}
    <div class='break-after-page'>
      <PrintCategory {category} />
    </div>
  {:else}
    <PrintCategoryRankingOnly {category} />
  {/if}
{/each}
