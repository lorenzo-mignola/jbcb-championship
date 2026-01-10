import type { Match } from '../../types/match.type';

class MatchState {
  match = $state<Match | undefined>(undefined);
}

export const matchState = new MatchState();
