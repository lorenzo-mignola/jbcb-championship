import { nanoid } from 'nanoid';
import { writable } from 'svelte/store';
import type { Judoka } from '../../lib/types/Judoka';

export const athletes = writable<Judoka[]>([]);

export const addAthlete = (name: string) =>
  athletes.update((old) => [...old, { name, id: nanoid() }]);

export const removeAthlete = (id: string) =>
  athletes.update((old) => old.filter((athlete) => athlete.id !== id));

export const resetAthletes = () => athletes.set([]);
