<script>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Stats from '$lib/components/category/stats/stats.svelte';
  import Back from '../../../icons/back.svelte';
  import Next from '../../../icons/next.svelte';
  import Print from '../../../icons/print.svelte';
  import Loading from './loading.svelte';

  export let data;
  const category = data.category;
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class="flex justify-between mb-10">
      <h2 class="h2 font-bold">{category.name}</h2>

      {#if category.currentMatch}
        <div class="flex items-center gap-3">
          <div>
            <a href={`/print/${category.id}`} class="btn-icon btn-sm variant-soft-surface"
              ><Print /></a
            >
          </div>
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

<a href="/categories" class="btn btn-sm variant-soft-surface mt-8 shadow-md">
  <span><Back /></span>
  <span>Tutte le categorie</span>
</a>
