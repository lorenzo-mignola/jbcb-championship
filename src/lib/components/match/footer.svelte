<script lang="ts" strictEvents>
  import Back from '$lib/icons/back.svelte';
  import type { Match } from '../../types/match.type';
  import NextMatch from './next-match.svelte';

  export let categoryId: string;
  export let nextMatch: Match | undefined;
</script>

<footer class="py-14 flex justify-between items-center flex-col-reverse md:flex-row">
  <div>
    <a class="btn btn-sm variant-filled-secondary shadow-md" href={`/categories/${categoryId}`}>
      <span><Back /></span>
      <span>Visualizza categoria</span>
    </a>
  </div>
  <NextMatch {nextMatch} />
</footer>
