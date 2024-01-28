import { localStorageStore } from '@skeletonlabs/skeleton';
import type { JudokaType, Match } from '../types/match.type';

const defaultMatch: Match = {
  id: '',
  finalTime: null,
  goldenScore: null,
  white: undefined,
  blue: undefined
};

export const localStorageMatch = localStorageStore<Match>('jbcb-championship-match', defaultMatch);
export const localStorageCategoryName = localStorageStore('jbcb-championship-category-name', '');
export const localStorageMatchType = localStorageStore<null | 'medal' | 'repechage'>(
  'jbcb-championship-match-type',
  null
);
export const localStorageNextMatch = localStorageStore<Pick<Match, 'white' | 'blue' | 'id'>>(
  'jbcb-championship-next-match',
  defaultMatch
);
export const localStorageTime = localStorageStore('jbcb-championship-time', 0);
export const localStorageOsaekomi = localStorageStore('jbcb-championship-osaekomi', 0);
export const localStorageGoldenScore = localStorageStore('jbcb-championship-golden-score', false);
export const localStorageOsaekomiType = localStorageStore<JudokaType | ''>(
  'jbcb-championship-osaekomi-type',
  ''
);

export const getMatchType = (isMedalMatch: boolean | undefined, isRepechage: boolean) => {
  if (isMedalMatch) {
    return 'medal';
  }
  if (isRepechage) {
    return 'repechage';
  }
  return null;
};

export const resetStorageMatch = () => {
  localStorageMatch.set(defaultMatch);
  localStorageNextMatch.set(defaultMatch);
  localStorageCategoryName.set('');
  localStorageTime.set(0);
  localStorageOsaekomi.set(0);
  localStorageOsaekomiType.set('');
  localStorageGoldenScore.set(false);
  localStorageMatchType.set(null);
};
