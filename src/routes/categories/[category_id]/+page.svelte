<script>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Stats from '$lib/components/category/stats/stats.svelte';
  import Back from '$lib/icons/back.svelte';
  import Edit from '$lib/icons/edit.svelte';
  import Next from '$lib/icons/next.svelte';
  import Print from '$lib/icons/print.svelte';
  import { formatTimeString } from '$lib/store/$timer';
  import { CATEGORY_NAME } from '$lib/utils/constants';
  import Loading from './loading.svelte';

  export let data;
  const category = data.category;
  const started = Boolean(category?.matches[0]?.winner);
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class="flex justify-between md:mb-10 flex-col-reverse md:flex-row gap-2 md:gap-0">
      <h2 class="h2 font-bold">{category.name}</h2>

      <div class="flex items-center gap-1 md:gap-3 justify-end md:justify-between">
        {#if !started}
          <a
            class="btn-icon btn-sm variant-soft-surface"
            href={`/categories/${category._id}/edit?${CATEGORY_NAME}=${category.name}`}
            title="Modifica"><Edit /></a
          >
        {/if}

        <a
          class="btn-icon btn-sm variant-soft-surface"
          href={`/categories/${category._id}/print`}
          rel="noopener noreferrer"
          target="_blank"
          title="Stampa"><Print /></a
        >

        {#if category.currentMatch}
          <a href={`/categories/${category._id}/match/${category.currentMatch}`}>
            <button class="btn md:btn-lg variant-filled-primary shadow-md" type="button"
              >Prossimo incontro <span class="ml-2"><Next /></span></button
            >
          </a>
        {/if}
      </div>
    </div>
    <AthleteList athletes={category.athletes} iconAction={undefined}></AthleteList>
    <div class="flex gap-2 my-2">
      <p>Durata incontri:</p>
      <span class="badge variant-ghost-surface">{formatTimeString(category.duration)}</span>
    </div>
    <Stats {category} />
  {/if}
</div>

<a class="btn btn-sm variant-filled-secondary mt-8 shadow-md" href="/categories">
  <span><Back /></span>
  <span>Tutte le categorie</span>
</a>
