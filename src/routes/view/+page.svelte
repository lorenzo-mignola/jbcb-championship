<script lang="ts" strictEvents>
  import {
    localStorageCategoryName,
    localStorageGoldenScore,
    localStorageMatch,
    localStorageMatchType,
    localStorageNextMatch,
    localStorageOsaekomi,
    localStorageOsaekomiType,
    localStorageTime
  } from '$lib/store/$local-storage-match';

  import FullScreen from '../../lib/components/full-screen.svelte';
  import JudokaNameAndPoints from '../../lib/components/match/judoka/judoka-name-and-points.svelte';
  import NextMatch from '../../lib/components/match/next-match.svelte';
  import TimerView from '../../lib/components/match/timer-view.svelte';
  import { getMin, getSec } from '../../lib/store/$timer';
  import { getPoints } from '../../lib/store/judoka-points';

  $: white = $localStorageMatch.white;
  $: blue = $localStorageMatch.blue;
  $: whitePoints = white ? getPoints(white) : 0;
  $: bluePoints = blue ? getPoints(blue) : 0;

  $: min = getMin($localStorageTime);
  $: sec = getSec($localStorageTime);
</script>

<div class="view-container">
  <div class="mb-10 flex items-center justify-between">
    <h1 class="text-6xl">
      {#if $localStorageCategoryName}
        {$localStorageCategoryName}
      {:else}
        &nbsp;
      {/if}
    </h1>
    <div class="text-5xl">
      {#if $localStorageMatchType === 'medal'}
        <span
          class="badge border-4 border-warning-600 text-4xl shadow-md shadow-warning-600"
          title="Incontro valido per l'assegnazione delle medaglie">🏅</span
        >
      {/if}
      {#if $localStorageMatchType === 'repechage'}
        <span class="italic">Ripescaggio</span>
      {/if}
    </div>
  </div>
  <div class="judoka-white-card text-8xl">
    <JudokaNameAndPoints athlete={white} points={whitePoints} />
  </div>
  <div class="judoka-blue-card text-8xl">
    <JudokaNameAndPoints athlete={blue} points={bluePoints} />
  </div>
  <TimerView
    isGoldenScore={$localStorageGoldenScore}
    {min}
    oseakomiType={$localStorageOsaekomiType || null}
    {sec}
    timer={$localStorageOsaekomi}
    view={true}
  />
  <div class="mt-4 flex justify-end">
    <NextMatch nextMatch={$localStorageNextMatch} view={true} />
  </div>
  <FullScreen />
</div>

<style lang="postcss">
  /* remove nav bar */
  :global(.app-bar) {
    display: none !important;
  }
  .view-container {
    height: calc(100vh - 64px);
    @apply flex flex-col justify-center;
  }
</style>
