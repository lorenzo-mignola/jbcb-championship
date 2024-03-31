import { complement } from 'ramda';
import type { Category, RankingAthlete } from '../../types/category.type';
import type { Match } from '../../types/match.type';
import { getRankingBrackets } from './ranking-brackets';
import { getRankingDoublePool } from './ranking-double-pool';
import { getRankingPool } from './ranking-single-pool';

export { getRankingBrackets } from './ranking-brackets';
export { getRankingDoublePool } from './ranking-double-pool';
export { getRankingPool } from './ranking-single-pool';

export const isByeMatch = ({ white, blue }: Match) => !white || !blue;

export const isNotByeMatch = complement(isByeMatch);

export const getRankingIcon = (rankValue: number) => {
  switch (rankValue) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
    case 4:
      return '🥉';

    default:
      return `#${rankValue.toString()}`;
  }
};

export const shuffleArray = <T>(originalArray: T[]) => {
  const array = JSON.parse(JSON.stringify(originalArray)) as T[];
  return array.sort(() => Math.random() - 0.5);
};

export const getRanking = (category?: Category): RankingAthlete[] => {
  if (!category) {
    return [];
  }

  // category is not ended
  if (category.currentMatch) {
    return [];
  }

  if (category.type === 'pool') {
    return getRankingPool(category.matches, category.athletes);
  }
  if (category.type === 'double_pool') {
    return getRankingDoublePool(category.semifinals, category.finalMatch);
  }
  // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- used as switch case
  if (category.type === 'brackets') {
    return getRankingBrackets(category.matches);
  }
  return [];
};
