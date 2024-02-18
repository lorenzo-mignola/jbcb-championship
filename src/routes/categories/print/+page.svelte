<script lang="ts" strictEvents>
  import { browser } from '$app/environment';
  import AthleteList from '$lib/components/athlete-list.svelte';
  import PrintButton from '$lib/components/print-button.svelte';
  import { formatTimeString } from '$lib/store/$timer';
  import { typeToLabel } from '$lib/store/$type.js';
  import { onMount } from 'svelte';
  import { isMobile } from '../../../lib/utils/mobile.js';

  export let data;

  onMount(() => {
    if (browser && !isMobile()) {
      data.autoPrint && window.print();
    }
  });
</script>

<div class="mb-10 flex justify-between">
  <h1 class="h1">Categorie</h1>
  <PrintButton />
</div>
{#each data.categories as category (category.id)}
  <div class="mb-12 break-inside-avoid-page">
    <h2 class="h2 mb-2 font-bold">{category.name}</h2>
    <p>Judoka iscritti: {category.athletes.length}</p>
    <p>Durata incontro: {formatTimeString(category.duration)}</p>
    <p>Tipologia di categoria: {typeToLabel[category.type]}</p>
    <AthleteList athletes={category.athletes} showTitle={false} />
  </div>
{/each}
