import { localStorageStore } from '@skeletonlabs/skeleton';

import type { Match } from '../types/match.type';

export const errorMatches = localStorageStore<Match[]>('jbcb-championship-error', []);
