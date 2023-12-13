import type { Judoka } from './Judoka';
import type { Match } from './Match';

type CategoryType = 'pool' | 'double-pool' | 'brackets';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  athletes: Judoka[];
  matches: (Match | null)[];
  currentMatch?: string;
}

export interface PoolCategory extends Category {
  matches: Match[];
}

export interface BracketsCategory extends Category {
  rounds: Rounds;
}

export type Rounds = BracketRound[];

interface BracketRound {
  winner: (Match | null)[];
  loser: (Match | null)[];
  repechage: (Match | null)[];
  round: number;
}
