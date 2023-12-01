import { nanoid } from 'nanoid';
import type { Athlete } from '../../types/Athlete';
import type { Category } from '../../types/Category';
import { Match } from '../Match';

export class SinglePool implements Category {
  id: string;
  type: Category['type'];
  matches: Match[];
  currentMatch?: string | undefined;

  constructor(
    public name: string,
    public athletes: Athlete[]
  ) {
    this.type = 'pool';
    this.id = nanoid();
    this.matches = this.createMatches();
    this.currentMatch = this.matches[0].id;
  }

  private createMatches(): Match[] {
    const athletesLength = this.athletes.length;
    const isOddPool = athletesLength % 2 !== 0;
    const matchPerRound = Math.floor(athletesLength / 2);
    const rounds = athletesLength - (isOddPool ? 0 : 1);
    const tmpMatches = [];
    let athletesInRound = JSON.parse(JSON.stringify(this.athletes));
    for (let round = 0; round < rounds; round++) {
      const last = athletesLength - (isOddPool ? 2 : 1);
      for (let matchInRound = 0; matchInRound < matchPerRound; matchInRound++) {
        const white = athletesInRound[matchInRound];
        const blue = athletesInRound[last - matchInRound];
        const match = new Match(white, blue);
        tmpMatches.push(match);
      }
      athletesInRound = this.rotateArray(athletesInRound);
    }
    return tmpMatches;
  }

  private rotateArray(athletes: Athlete[]) {
    const [first, ...others] = athletes;
    return [...others, first];
  }

  public nextMatch() {
    const indexCurrent = this.matches.findIndex((match) => match.id === this.currentMatch);
    if (indexCurrent === this.matches.length) {
      this.currentMatch = undefined;
      return;
    }
    this.currentMatch = this.matches[indexCurrent + 1].id;
  }
}
