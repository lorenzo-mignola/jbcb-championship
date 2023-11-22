<script>
  import AthleteList from '$lib/components/AthleteList.svelte';
  import { getCategory } from '../../lib/db/methods';
  import Loading from './loading.svelte';
  import Stats from './stats.svelte';

  export let data;
  const category = getCategory(data.id);
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <h2 class="h2 font-bold mb-10">{category.name}</h2>
    <AthleteList athletes={category.athletes}></AthleteList>
    <Stats {category} />
  {/if}
</div>
