<script lang="ts" strictEvents>
  import type { DoublePoolCategory } from '../../../types/category.type';
  import { poolToCategory } from './pool-to-category';
  import Ranking from './ranking.svelte';

  export let category: DoublePoolCategory;
</script>

<div class="font-bold">Pool A</div>
<Ranking category={poolToCategory(category.pools.A, category.pools.aAthletes, 'A')} />

<div class="font-bold">Pool B</div>
<Ranking category={poolToCategory(category.pools.B, category.pools.bAthletes, 'B')} />
