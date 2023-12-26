import { writable } from 'svelte/store';
import type { Match } from '../../../../../lib/types/Match';

export const match = writable<Match | undefined>();