import type { Athlete } from './Athlete';

export interface Category {
  id: string;
  name: string;
  athletes: Athlete[];
}
