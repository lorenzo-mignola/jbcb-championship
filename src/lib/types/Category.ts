import type { Judoka } from './Judoka';
import type { Match } from './Match';

export interface Category {
  id: string;
  name: string;
  type: 'pool' | 'double-pool' | 'brackets';
  athletes: Judoka[];
  matches: Match[];
  currentMatch?: string;
}
