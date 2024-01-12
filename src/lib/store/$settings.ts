import { localStorageStore } from '@skeletonlabs/skeleton';

export const clubs = localStorageStore<string[]>('jbcb-championship-clubs', []);

export const addClub = (newClub: string) => {
  clubs.update(($clubs) => [...$clubs, newClub]);
};

export const removeClub = (clubToRemove: string) => {
  clubs.update(($clubs) => $clubs.filter((club) => club !== clubToRemove));
};
