<script lang="ts">
  import type { DoublePoolCategory } from '../../../../lib/types/Category';
  import { poolToCategory } from './poolToCategory';
  import Ranking from './ranking.svelte';

  export let category: DoublePoolCategory;
</script>

<div class="font-bold">Pool A</div>
<Ranking category={poolToCategory(category.pools.A, category.pools.aAthletes, 'A')} />

<div class="font-bold">Pool B</div>
<Ranking category={poolToCategory(category.pools.B, category.pools.bAthletes, 'B')} />
