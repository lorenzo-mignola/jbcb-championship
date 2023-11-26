import { nanoid } from 'nanoid';
import type { Athlete } from '../types/Athlete';
import type { MatchJudoka, Match as MatchType } from '../types/Match';

export class Match implements MatchType {
  id: string;
  white: MatchJudoka;
  blue: MatchJudoka;
  finalTime = null;

  constructor(white: Athlete, blue: Athlete) {
    this.id = nanoid();
    this.white = this.createMatchJudoka(white);
    this.blue = this.createMatchJudoka(blue);
  }

  private createMatchJudoka(athlete: Athlete) {
    return {
      id: athlete.id,
      name: athlete.name,
      wazari: 0,
      ippon: 0,
      shido: 0
    };
  }
}
