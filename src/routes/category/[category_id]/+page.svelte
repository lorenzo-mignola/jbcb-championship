<script>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Stats from '$lib/components/category/stats/stats.svelte';
  import Back from '$lib/icons/back.svelte';
  import Next from '$lib/icons/next.svelte';
  import Print from '$lib/icons/print.svelte';
  import { formatTimeString } from '$lib/store/$timer';
  import Loading from './loading.svelte';

  export let data;
  const category = data.category;
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class="flex justify-between md:mb-10 flex-col-reverse md:flex-row gap-2 md:gap-0">
      <h2 class="h2 font-bold">{category.name}</h2>

      <div class="flex items-center gap-3 justify-end md:justify-between">
        <div>
          <a
            href={`/category/${category.id}/print`}
            class="btn-icon btn-sm variant-soft-surface"
            target="_blank"><Print /></a
          >
        </div>
        {#if category.currentMatch}
          <a href={`/category/${category.id}/match/${category.currentMatch}`}>
            <button class="btn btn-lg variant-filled-primary shadow-md"
              >Prossimo incontro <span class="ml-2"><Next /></span></button
            >
          </a>
        {/if}
      </div>
    </div>
    <AthleteList athletes={category.athletes}></AthleteList>
    <div class="flex gap-2 my-2">
      <p>Durata incontri:</p>
      <span class="badge variant-ghost-surface">{formatTimeString(category.duration)}</span>
    </div>
    <Stats {category} />
  {/if}
</div>

<a href="/categories" class="btn btn-sm variant-filled-secondary mt-8 shadow-md">
  <span><Back /></span>
  <span>Tutte le categorie</span>
</a>
