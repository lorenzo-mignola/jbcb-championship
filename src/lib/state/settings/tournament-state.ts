import { persistLocalStore } from '../utils/persist-local-state.svelte';

class TournamentState {
  #tournament = persistLocalStore('jbcb-championship-tournament', '');

  get tournament() {
    return this.#tournament.current;
  }

  set tournament(name: string) {
    this.#tournament.current = name;
  }
}

export const tournamentState = new TournamentState();
