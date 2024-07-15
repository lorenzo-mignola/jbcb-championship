<script lang="ts" strictEvents>
  import Back from '$lib/icons/back.svelte';

  import type { Match } from '../../types/match.type';
  import NextMatch from './next-match.svelte';

  export let categoryId: string;
  export let nextMatch: Match | undefined;
</script>

<footer class="flex flex-col-reverse items-center justify-between py-14 md:flex-row">
  <div>
    <a class="variant-filled-secondary btn btn-sm shadow-md" href={`/categories/${categoryId}`}>
      <span><Back /></span>
      <span>Visualizza categoria</span>
    </a>
  </div>
  <NextMatch {nextMatch} />
</footer>
