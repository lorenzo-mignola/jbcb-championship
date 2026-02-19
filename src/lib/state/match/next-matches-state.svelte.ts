import ky from 'ky';

import type { Match } from '../../types/match.type';

class NextMatchesState {
  nextMatches = $state<Match[]>([]);

  resetNextMatches() {
    this.nextMatches = [];
  }

  async loadNextMatches(categoryId: string) {
    const nextMatches = await ky.get<Match[]>(`/api/categories/${categoryId}/nextMatches`).json();
    this.nextMatches = nextMatches;
  }
}

export const nextMatchesState = new NextMatchesState();
