import { writable } from 'svelte/store';
import type { Athlete } from '../../lib/types/Athlete';

export const athletes = writable<Athlete[]>([]);

export const addAthlete = (name: string) =>
	athletes.update((old) => [...old, { name, order: old.length }]);
