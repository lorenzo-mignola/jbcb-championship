<script lang='ts'>
  import AthleteList from '$lib/components/athlete-list.svelte';
  import Back from '$lib/icons/back.svelte';
  import Edit from '$lib/icons/edit.svelte';
  import Next from '$lib/icons/next.svelte';
  import Print from '$lib/icons/print.svelte';
  import { isNotByeMatch } from '$lib/models/ranking/category';
  import { formatTimeString } from '$lib/utils/timer-utils';

  import { tournamentState } from '../../../lib/state/tournament-state.js';
  import Loading from './components/loading.svelte';
  import Stats from './components/stats.svelte';

  const { data } = $props();
  const category = $derived(data.category);
  const matches = $derived(category?.matches.filter(isNotByeMatch) || []);
  const firstMatch = $derived(matches[0]);
  const started = $derived(Boolean(firstMatch?.winner));
</script>

<div>
  {#if !category}
    <Loading />
  {:else}
    <div class='
      flex flex-col-reverse justify-between gap-2
      md:mb-10 md:flex-row md:gap-0
    '>
      <h2 class='h2 font-bold'>{category.name}</h2>

      <div class='
        flex items-center justify-end gap-1
        md:justify-between md:gap-3
      '>
        {#if !started}
          <a
            class='btn-icon btn preset-tonal-surface'
            href={`/categories/${category.id}/edit?tournament=${category.tournament || ''}`}
            title='Modifica'><Edit /></a
          >
        {/if}

        <a
          class='btn-icon btn preset-tonal-surface'
          href={`/categories/${category.id}/print`}
          rel='noopener noreferrer'
          target='_blank'
          title='Stampa'><Print /></a
        >

        {#if category.currentMatch}
          <a href={`/categories/${category.id}/match/${category.currentMatch}`}>
            <button class='
              btn preset-filled-primary-500 shadow-md
              md:btn-lg
            ' type='button'
            >Prossimo incontro <span class='ml-2'><Next /></span></button
            >
          </a>
        {/if}
      </div>
    </div>
    <AthleteList athletes={category.athletes}></AthleteList>
    <div class='my-2 flex gap-2'>
      <p>Durata incontri:</p>
      <span
        class='badge border border-surface-500 preset-tonal-surface'>
        {formatTimeString(category.duration)}
      </span>
    </div>
    <Stats {category} />
  {/if}
</div>

<a
  class='mt-8 btn preset-filled-secondary-500 btn-sm shadow-md'
  href={`/categories?tournament=${tournamentState.tournament}`}
>
  <span><Back /></span>
  <span>Tutte le categorie</span>
</a>
