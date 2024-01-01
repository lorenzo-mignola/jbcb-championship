<script lang="ts">
  import {
    localStorageCategoryName,
    localStorageMatch,
    localStorageTime
  } from '$lib/store/$localStorageMatch';
  import JudokaNameAndPoints from '../../lib/components/match/judoka/judoka-name-and-points.svelte';
  import TimerView from '../../lib/components/match/timer-view.svelte';
  import { getMin, getSec } from '../../lib/store/$timer';
  import { getPoints } from '../../lib/store/judokaPoints';
  import type { MatchJudoka } from '../../lib/types/Match';

  let white: MatchJudoka | undefined = undefined;
  let blue: MatchJudoka | undefined = undefined;
  let categoryName = '';
  let whitePoints = 0;
  let bluePoints = 0;
  let min = 0;
  let sec = 0;

  localStorageMatch.subscribe(($match) => {
    if (!$match) {
      return;
    }
    white = $match.white;
    whitePoints = white ? getPoints(white) : 0;
    bluePoints = blue ? getPoints(blue) : 0;
    blue = $match.blue;
  });

  localStorageCategoryName.subscribe(($categoryName) => {
    categoryName = $categoryName;
  });
  localStorageTime.subscribe(($time) => {
    min = getMin($time);
    sec = getSec($time);
  });
</script>

<div class="view-container">
  <div>
    <h1 class="text-5xl mb-10">{categoryName}</h1>
  </div>
  <div class="judoka-white-card text-7xl">
    <JudokaNameAndPoints athlete={white} points={whitePoints} />
  </div>
  <div class="judoka-blue-card text-7xl">
    <JudokaNameAndPoints athlete={blue} points={bluePoints} />
  </div>
  <TimerView {min} {sec} isGoldenScore={false} oseakomiType={null} />
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
