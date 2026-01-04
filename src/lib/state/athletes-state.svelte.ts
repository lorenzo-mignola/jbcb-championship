import { nanoid } from 'nanoid';

import type { Judoka } from '../types/judoka.type';

class AthletesState {
  #athletes = $state<Judoka[]>([]);

  get athletes() {
    return this.#athletes;
  }

  set athletes(athletes: Judoka[]) {
    this.#athletes = athletes;
  }

  addAthlete(newAthlete: { name: string; club?: string }) {
    this.#athletes = [
      ...this.#athletes,
      {
        id: nanoid(),
        ...newAthlete,
      },
    ];
  }

  removeAthlete(id: string) {
    this.#athletes = this.#athletes.filter(athlete => athlete.id !== id);
  }

  resetAthletes() {
    this.#athletes = [];
  }

  getAthletes() {
    return this.#athletes;
  }
}

export const athletesState = new AthletesState();
