<script lang="ts" strictEvents>
  import {
    localStorageCategoryName,
    localStorageMatch,
    localStorageTime
  } from '$lib/store/$local-storage-match';
  import JudokaNameAndPoints from '../../lib/components/match/judoka/judoka-name-and-points.svelte';
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
  <div>
    <h1 class="text-5xl mb-10">{$localStorageCategoryName}</h1>
  </div>
  <div class="judoka-white-card text-7xl">
    <JudokaNameAndPoints athlete={white} points={whitePoints} />
  </div>
  <div class="judoka-blue-card text-7xl">
    <JudokaNameAndPoints athlete={blue} points={bluePoints} />
  </div>
  <TimerView isGoldenScore={false} {min} oseakomiType={null} {sec} />
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
