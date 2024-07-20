<script lang="ts" strictEvents>
  import Back from '$lib/icons/back.svelte';

  import type { Match } from '../../types/match.type';
  import NextMatch from './next-match.svelte';
  import NextMatchDrawer from './next-match-drawer/next-match-button.svelte';

  export let categoryId: string;
  export let nextMatch: Match | undefined;
</script>

<footer class="flex flex-col-reverse items-end justify-between py-14 md:flex-row">
  <div class="block">
    <div>
      <a class="variant-filled-secondary btn shadow-md" href={`/categories/${categoryId}`}>
        <span><Back /></span>
        <span>Visualizza categoria</span>
      </a>
    </div>
  </div>
  <div>
    <NextMatch {nextMatch} />
    <NextMatchDrawer {categoryId} />
  </div>
</footer>
