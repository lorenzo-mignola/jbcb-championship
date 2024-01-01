import type { Judoka } from './Judoka';
import type { Match } from './Match';

type CategoryType = 'pool' | 'double-pool' | 'brackets';

interface BaseCategory<T extends CategoryType> {
  id: string;
  name: string;
  athletes: Judoka[];
  matches: Match[];
  currentMatch?: string;
  duration: number;
  type: T;
}

export interface PoolCategory extends BaseCategory<'pool'> {}

export interface DoublePoolCategory extends BaseCategory<'double-pool'> {
  pools: {
    A: Match[];
    B: Match[];
    aAthletes: Judoka[];
    bAthletes: Judoka[];
  };
  semifinals: [Match, Match];
  finalMatch: Match;
}

export interface BracketsCategory extends BaseCategory<'brackets'> {
  rounds: Rounds;
}

export type Category = PoolCategory | BracketsCategory | DoublePoolCategory;

export type Rounds = BracketRound[];

export interface BracketRound {
  winner: Match[];
  loser: Match[];
  repechage: Match[];
}
