import { derived } from 'svelte/store';
import type { MatchJudoka } from '../types/Match';
import { match } from './$match';

export const getPoints = (athlete?: MatchJudoka) => {
  if (athlete?.ippon) {
    return 10;
  }
  if (athlete?.wazari === 2) {
    return 10;
  }
  return athlete?.wazari || 0;
};

const judokasPoints = derived(match, ($match) => {
  if (!$match) {
    return {
      white: 0,
      blue: 0
    };
  }
  const { white, blue } = $match;
  return {
    white: getPoints(white),
    blue: getPoints(blue)
  };
});

export const whitePoints = derived(judokasPoints, (points) => points.white);

export const bluePoints = derived(judokasPoints, (points) => points.blue);
