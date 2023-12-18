import type { Judoka } from './Judoka';
import type { Match } from './Match';

type CategoryType = 'pool' | 'double-pool' | 'brackets';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  athletes: Judoka[];
  matches: Match[];
  currentMatch?: string;
}

export interface PoolCategory extends Category {}

export interface BracketsCategory extends Category {
  rounds: Rounds;
}

export type Rounds = BracketRound[];

interface BracketRound {
  winner: Match[];
  loser: Match[];
  repechage: Match[];
  round: number;
}
