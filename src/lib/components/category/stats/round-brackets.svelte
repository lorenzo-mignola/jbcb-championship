<script lang="ts" strictEvents>
  import type { Match } from '../../../types/match.type';

  type BracketMatch = Match & { offset?: boolean };

  export let matches: BracketMatch[];
  export let goldMatch = false;
  export let bronzeMatch = false;
</script>

<div class="mx-2 flex h-full w-52 flex-col justify-around md:w-64 print:w-32 print:text-sm">
  {#each matches as match (match.id)}
    <div
      class="my-2 flex h-20 flex-col justify-between border border-l-0 border-black dark:border-white"
      class:mb-16={match.offset}
    >
      <div class="mt-1 px-3 text-end" class:font-extrabold={match.winner === 'white'}>
        {#if goldMatch && match.winner}
          {match.winner === 'white' ? '🥇' : '🥈'}
        {/if}
        {#if bronzeMatch && match.winner === 'white'}
          🥉
        {/if}
        {match.white?.name ?? ''}
      </div>
      <div class="mb-1 px-3 text-end" class:font-extrabold={match.winner === 'blue'}>
        {#if goldMatch && match.winner}
          {match.winner === 'blue' ? '🥇' : '🥈'}
        {/if}
        {#if bronzeMatch && match.winner === 'blue'}
          🥉
        {/if}
        {match.blue?.name ?? ''}
      </div>
    </div>
  {/each}
</div>
