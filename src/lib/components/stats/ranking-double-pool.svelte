<script lang='ts'>
  import type { DoublePoolCategory } from '$lib/types/category.type';

  import { poolToCategory } from '$lib/utils/categories-utils';

  import Ranking from './ranking.svelte';

  interface Props {
    category: DoublePoolCategory;
  }

  const { category }: Props = $props();
</script>

<div class='font-bold'>Pool A</div>
<Ranking category={poolToCategory(category.pools.A, category.pools.aAthletes, 'A')} />

<div class='font-bold'>Pool B</div>
<Ranking category={poolToCategory(category.pools.B, category.pools.bAthletes, 'B')} />
