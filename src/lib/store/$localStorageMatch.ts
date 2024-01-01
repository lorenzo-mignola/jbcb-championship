import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Match } from '../types/Match';

const defaultMatch: Match = {
  id: '',
  finalTime: null,
  goldenScore: null
};

export const localStorageMatch = localStorageStore<Match>('jbcb-championship-match', defaultMatch);

export const localStorageCategoryName = localStorageStore('jbcb-championship-category-name', '');

export const localStorageTime = localStorageStore('jbcb-championship-time', 0);

export const resetStorageMatch = () => {
  localStorageMatch.set(defaultMatch);
  localStorageCategoryName.set('');
  localStorageTime.set(0);
};
