<script lang='ts'>
  import FullScreen from '#lib/components/full-screen.svelte';
  import { getPoints } from '#lib/state/match/judoka-points-state.svelte';
  import {
    localStorageMatchState,
  } from '#lib/state/match/local-storage-match-state.svelte';
  import { getMinutes, getSeconds } from '#lib/utils/timer-utils';

  import JudokaNameAndPoints from
    '../categories/[category_id]/match/[match_id]/components/judoka/judoka-name-and-points.svelte';
  import NextMatch from
    '../categories/[category_id]/match/[match_id]/components/next-match.svelte';
  import TimerView from
    '../categories/[category_id]/match/[match_id]/components/timer-view.svelte';

  const white = $derived(localStorageMatchState.match.white);
  const blue = $derived(localStorageMatchState.match.blue);
  const winner = $derived(localStorageMatchState.match.winner);
  const whitePoints = $derived(getPoints(white));
  const bluePoints = $derived(getPoints(blue));

  const min = $derived(getMinutes(localStorageMatchState.time));
  const sec = $derived(getSeconds(localStorageMatchState.time));
</script>

<div class='local-view-container'>
  <div class='mb-10 flex items-center justify-between'>
    <h1 class='text-6xl'>
      {#if localStorageMatchState.categoryName}
        {localStorageMatchState.categoryName}
      {:else}
        &nbsp;
      {/if}
    </h1>
    <div class='text-5xl'>
      {#if localStorageMatchState.matchType === 'medal'}
        <span
          class='
            badge border-4 border-warning-600 text-4xl shadow-md
            shadow-warning-600
          '
          title="Incontro valido per l'assegnazione delle medaglie">🏅</span
        >
      {/if}
      {#if localStorageMatchState.matchType === 'repechage'}
        <span class='italic'>Ripescaggio</span>
      {/if}
    </div>
  </div>
  <div
    class='judoka-white-card border-2 text-8xl!'
    class:border-transparent={winner !== 'white'}
    class:local-winner={winner === 'white'}
  >
    <JudokaNameAndPoints athlete={white} points={whitePoints} />
  </div>
  <div
    class='judoka-blue-card border-2 text-8xl!'
    class:border-transparent={winner !== 'blue'}
    class:local-winner={winner === 'blue'}
  >
    <JudokaNameAndPoints athlete={blue} points={bluePoints} />
  </div>
  <TimerView
    isGoldenScore={localStorageMatchState.goldenScore}
    {min}
    oseakomiType={localStorageMatchState.osaekomiType || null}
    {sec}
    timer={localStorageMatchState.osaekomiTime}
    view={true}
  />
  <div class='mt-4 flex justify-end'>
    <NextMatch nextMatch={localStorageMatchState.nextMatch} view={true} />
  </div>
  <FullScreen />
</div>

<style lang='postcss'>
  @reference "tailwindcss";

  /* remove nav bar */
  :global([data-scope='app-bar']) {
    display: none !important;
  }
  .local-view-container {
    height: calc(100vh - 64px);
    @apply flex flex-col justify-center;
  }
  .local-winner {
    @apply border-yellow-300 shadow-lg shadow-yellow-300/50;
  }
</style>
