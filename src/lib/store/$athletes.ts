import { nanoid } from 'nanoid';
import { writable } from 'svelte/store';
import type { Judoka } from '../types/Judoka';

export const athletes = writable<Judoka[]>([]);

export const addAthlete = (newAthlete: { name: string; club?: string }) =>
  athletes.update((old) => [
    ...old,
    {
      id: nanoid(),
      ...newAthlete
    }
  ]);

export const removeAthlete = (id: string) =>
  athletes.update((old) => old.filter((athlete) => athlete.id !== id));

export const resetAthletes = () => athletes.set([]);
