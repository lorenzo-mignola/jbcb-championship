<script>
  import AthleteList from '$lib/components/AthleteList.svelte';
  import Next from '../../icons/next.svelte';
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
    <div class="flex justify-between">
      <h2 class="h2 font-bold mb-10">{category.name}</h2>
      <div>
        <a href={`/category/match?id=${category.id}`}>
          <button class="btn btn-lg variant-filled-primary"
            >Inizia <span class="ml-2"><Next /></span></button
          >
        </a>
      </div>
    </div>
    <AthleteList athletes={category.athletes}></AthleteList>
    <Stats {category} />
  {/if}
</div>
