<script lang="ts" strictEvents>
  import type { Category } from '../../types/category.type';
  import Ranking from './stats/ranking.svelte';

  export let category: Category;
</script>

<div class="mb-12 break-inside-avoid-page">
  <h1 class="h1 mb-4 font-bold">{category.name}</h1>

  <div class="break-inside-avoid-page">
    <h2 class="h3 mt-4">Classifica</h2>
    <Ranking {category} compact={true} />
  </div>
</div>
