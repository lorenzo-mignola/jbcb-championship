<script lang="ts">
  import type { Match } from '../../../../lib/types/Match';
  type BracketMatch = Match & { offset?: boolean };

  export let matches: BracketMatch[];
</script>

<div class="w-52 md:w-64 mx-4 h-full flex flex-col justify-around">
  {#each matches as match}
    <div
      class="border border-black dark:border-white border-l-0 h-20 flex flex-col justify-between my-2"
      class:mb-10={match.offset}
    >
      <div class="mt-1">{match.white?.name ?? ''}</div>
      <div class="mb-1">{match.blue?.name ?? ''}</div>
    </div>
  {/each}
</div>
