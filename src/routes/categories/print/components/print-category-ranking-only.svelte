<script lang='ts'>
  import type { Category } from '$lib/types/category.type';

  import Ranking from '$lib/components/stats/ranking.svelte';

  interface Props {
    category: Category;
  }

  const { category }: Props = $props();
</script>

<div class='mb-12 break-inside-avoid-page'>
  <h1 class='mb-4 h1 font-bold'>{category.name}</h1>

  <div class='break-inside-avoid-page'>
    <h2 class='mt-4 h3'>Classifica</h2>
    <Ranking {category} compact={true} />
  </div>
</div>
