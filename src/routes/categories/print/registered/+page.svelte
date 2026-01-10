<script lang='ts'>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import AthleteList from '$lib/components/athlete-list.svelte';
  import PrintButton from '$lib/components/print-button.svelte';
  import { typeToLabel } from '$lib/state/category-edit/category-type-state.svelte.js';
  import { isMobile } from '$lib/utils/mobile.js';
  import { formatTimeString } from '$lib/utils/timer-utils.js';

  const { data } = $props();

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class='mb-10 flex justify-between'>
  <h1 class='h1'>Categorie</h1>
  <PrintButton />
</div>
{#each data.categories as category (category.id)}
  <div class='mb-12 break-inside-avoid-page'>
    <h2 class='mb-2 h2 font-bold'>{category.name}</h2>
    <p>Judoka iscritti: {category.athletes.length}</p>
    <p>Durata incontro: {formatTimeString(category.duration)}</p>
    <p>Tipologia di categoria: {typeToLabel[category.type]}</p>
    <AthleteList athletes={category.athletes} showTitle={false} />
  </div>
{/each}
