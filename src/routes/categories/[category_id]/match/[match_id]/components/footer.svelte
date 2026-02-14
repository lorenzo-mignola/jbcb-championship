<script lang='ts'>
  import type { Match } from '$lib/types/match.type';

  import Back from '$lib/icons/back.svelte';

  import NextMatchDrawer from './next-match-drawer.svelte';
  import NextMatch from './next-match.svelte';

  interface Props {
    categoryId: string;
    nextMatch: Match | undefined;
  }

  const { categoryId, nextMatch }: Props = $props();
</script>

<footer class='
  flex flex-col-reverse items-end justify-between py-14
  md:flex-row
'>
  <div class='block'>
    <div>
      <a class='btn preset-filled-secondary-500 shadow-md' href={`/categories/${categoryId}`}>
        <span><Back /></span>
        <span>Visualizza categoria</span>
      </a>
    </div>
  </div>
  <div>
    <NextMatch {nextMatch} />
    <NextMatchDrawer />
  </div>
</footer>
