import type { Athlete } from './Athlete';
import type { Round } from './Round';

export interface Category {
  id: string;
  name: string;
  athletes: Athlete[];
  rounds: Round[];
}
