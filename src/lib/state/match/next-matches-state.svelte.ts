import type { Match } from '../../types/match.type';

class NextMatchesState {
  nextMatches = $state<Match[]>([]);

  resetNextMatches() {
    this.nextMatches = [];
  }
}

export const nextMatchesState = new NextMatchesState();
