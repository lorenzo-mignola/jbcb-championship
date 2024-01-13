import { localStorageStore } from '@skeletonlabs/skeleton';
import type { JudokaType, Match } from '../types/match.type';

const defaultMatch: Match = {
  id: '',
  finalTime: null,
  goldenScore: null
};

export const localStorageMatch = localStorageStore<Match>('jbcb-championship-match', defaultMatch);
export const localStorageCategoryName = localStorageStore('jbcb-championship-category-name', '');
export const localStorageTime = localStorageStore('jbcb-championship-time', 0);
export const localStorageOsaekomi = localStorageStore('jbcb-championship-osaekomi', 0);
export const localStorageGoldenScore = localStorageStore('jbcb-championship-golden-score', false);
export const localStorageOsaekomiType = localStorageStore<JudokaType | ''>(
  'jbcb-championship-osaekomi-type',
  ''
);

export const resetStorageMatch = () => {
  localStorageMatch.set(defaultMatch);
  localStorageCategoryName.set('');
  localStorageTime.set(0);
  localStorageOsaekomi.set(0);
  localStorageOsaekomiType.set('');
  localStorageGoldenScore.set(false);
};
