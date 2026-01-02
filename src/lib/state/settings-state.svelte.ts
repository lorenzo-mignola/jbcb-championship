import { localStore } from './local-state.svelte';

class SettingsState {
  #clubs = localStore<string[]>('jbcb-championship-clubs', []);

  get clubs() {
    return this.#clubs.current;
  }

  addClub(newClub: string) {
    this.#clubs.current = [...this.#clubs.current, newClub];
  }

  removeClub(clubToRemove: string) {
    this.#clubs.current = this.#clubs.current.filter(club => club !== clubToRemove);
  }
}

export const settingsState = new SettingsState();
