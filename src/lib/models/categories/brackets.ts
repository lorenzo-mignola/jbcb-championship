import { nanoid } from 'nanoid';
import type { BracketsCategory, Rounds } from '../../types/Category';
import type { Judoka } from '../../types/Judoka';
import type { Match } from '../../types/Match';
import { createMatch } from '../match';

const createMatches = (matchInRound: number) => () => {
  const matches: Match[] = [];
  for (let index = 0; index < matchInRound; index++) {
    // TODO get judoka
    const fakeJudoka = {
      id: 'FAKE',
      name: 'FAKE'
    };
    matches.push(createMatch(fakeJudoka, fakeJudoka));
  }
  return matches;
};

const createRounds = (athletes: Judoka[]): Rounds => {
  const athletesCount = athletes.length;
  const winnerRounds = Math.log2(athletesCount);

  const rounds: Rounds = [];

  let winnerAthletes = athletesCount / 2;
  for (let round = 1; round <= winnerRounds; round++) {
    const create = createMatches(winnerAthletes);
    const isFirstOrLast = round === 1 || round === winnerRounds;
    const roundMatch = {
      round,
      winner: create(),
      loser: isFirstOrLast ? [] : create(),
      repechage: isFirstOrLast ? [] : create()
    };
    rounds.push(roundMatch);
    winnerAthletes /= 2;
  }

  return rounds;
};

// const loserRounds = (Math.log2(athletes.length) - 2) * 2;
const getMatches = (rounds: Rounds) =>
  rounds.flatMap(({ loser, winner, repechage }) => [loser, winner, repechage]).flat();

export const createBrackets = (name: string, athletes: Judoka[]): BracketsCategory => {
  const rounds = createRounds(athletes);
  const matches = getMatches(rounds);
  return {
    id: nanoid(),
    type: 'pool',
    name,
    athletes,
    matches,
    rounds,
    currentMatch: ''
  };
};
