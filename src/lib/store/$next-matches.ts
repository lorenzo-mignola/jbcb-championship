import { writable } from 'svelte/store';

import type { Match } from '../types/match.type';

export const nextMatches = writable<Match[]>([]);

export const setNextMatches = (matches: Match[]) => {
  nextMatches.set(matches);
};

export const resetNextMatches = () => {
  nextMatches.set([]);
};
