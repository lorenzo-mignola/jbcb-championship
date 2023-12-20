import type { Judoka } from './Judoka';
import type { Match } from './Match';

type CategoryType = 'pool' | 'double-pool' | 'brackets';

interface BaseCategory<T extends CategoryType> {
  id: string;
  name: string;
  athletes: Judoka[];
  matches: Match[];
  currentMatch?: string;
  type: T;
}

export interface PoolCategory extends BaseCategory<'pool'> {}

export interface BracketsCategory extends BaseCategory<'brackets'> {
  rounds: Rounds;
}

export type Category = PoolCategory | BracketsCategory;

export type Rounds = BracketRound[];

interface BracketRound {
  winner: Match[];
  loser: Match[];
  repechage: Match[];
  round: number;
}
