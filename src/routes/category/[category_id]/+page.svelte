<script>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Next from '../../../icons/next.svelte';
  import Loading from './loading.svelte';
  import Stats from './stats/stats.svelte';

  export let data;
  const category = data.category;
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class="flex justify-between">
      <h2 class="h2 font-bold mb-10">{category.name}</h2>
      {#if category.currentMatch}
        <div>
          <a href={`/category/${category.id}/match/${category.currentMatch}`}>
            <button class="btn btn-lg variant-filled-primary"
              >Prossimo incontro <span class="ml-2"><Next /></span></button
            >
          </a>
        </div>
      {/if}
    </div>
    <AthleteList athletes={category.athletes}></AthleteList>
    <Stats {category} />
  {/if}
</div>
