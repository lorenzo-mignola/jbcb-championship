import type { Athlete } from './Athlete';
import type { Match } from './Match';

export interface Category {
  id: string;
  name: string;
  type: 'pool' | 'double-pool' | 'brackets';
  athletes: Athlete[];
  matches: Match[];
  currentMatch?: string;
}
