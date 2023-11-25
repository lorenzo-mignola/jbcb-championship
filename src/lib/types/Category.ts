import type { Athlete } from './Athlete';
import type { Round } from './Round';

export interface Category {
  id: string;
  name: string;
  type: 'pool' | 'double-pool' | 'brackets';
  athletes: Athlete[];
  rounds: Round[];
}
