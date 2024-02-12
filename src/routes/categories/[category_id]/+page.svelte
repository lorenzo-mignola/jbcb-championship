<script>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Stats from '$lib/components/category/stats/stats.svelte';
  import Back from '$lib/icons/back.svelte';
  import Edit from '$lib/icons/edit.svelte';
  import Next from '$lib/icons/next.svelte';
  import Print from '$lib/icons/print.svelte';
  import { formatTimeString } from '$lib/store/$timer';
  import { tournament } from '$lib/store/$tournament';
  import Loading from './loading.svelte';

  export let data;
  const category = data.category;
  const started = Boolean(category?.matches[0]?.winner);
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class="flex flex-col-reverse justify-between gap-2 md:mb-10 md:flex-row md:gap-0">
      <h2 class="h2 font-bold">{category.name}</h2>

      <div class="flex items-center justify-end gap-1 md:justify-between md:gap-3">
        {#if !started}
          <a
            class="variant-soft-surface btn-icon btn-sm"
            href={`/categories/${category.id}/edit`}
            title="Modifica"><Edit /></a
          >
        {/if}

        <a
          class="variant-soft-surface btn-icon btn-sm"
          href={`/categories/${category.id}/print`}
          rel="noopener noreferrer"
          target="_blank"
          title="Stampa"><Print /></a
        >

        {#if category.currentMatch}
          <a href={`/categories/${category.id}/match/${category.currentMatch}`}>
            <button class="variant-filled-primary btn shadow-md md:btn-lg" type="button"
              >Prossimo incontro <span class="ml-2"><Next /></span></button
            >
          </a>
        {/if}
      </div>
    </div>
    <AthleteList athletes={category.athletes} iconAction={undefined}></AthleteList>
    <div class="my-2 flex gap-2">
      <p>Durata incontri:</p>
      <span class="variant-ghost-surface badge">{formatTimeString(category.duration)}</span>
    </div>
    <Stats {category} />
  {/if}
</div>

<a
  class="variant-filled-secondary btn btn-sm mt-8 shadow-md"
  href={`/categories?tournament=${$tournament}`}
>
  <span><Back /></span>
  <span>Tutte le categorie</span>
</a>
