import { nanoid } from 'nanoid';
import type { BracketsCategory, Rounds } from '../../types/Category';
import type { Judoka } from '../../types/Judoka';
import type { Match } from '../../types/Match';
import { getRandomElement } from '../../utils/match';
import { createMatch } from '../match';

const createMatches = (matchInRound: number) => (athletes?: Judoka[]) => () => {
  const matches: (Match | null)[] = [];
  let athletesNotPicket: Judoka[] = athletes ? JSON.parse(JSON.stringify(athletes)) : null;
  for (let index = 0; index < matchInRound; index++) {
    if (athletes) {
      const white = getRandomElement(athletesNotPicket);
      athletesNotPicket = athletesNotPicket.filter((athlete) => athlete.id !== white.id);
      const blue = getRandomElement(athletesNotPicket);
      athletesNotPicket = athletesNotPicket.filter((athlete) => athlete.id !== blue.id);

      matches.push(createMatch(white, blue));
      continue;
    }
    matches.push(null);
  }
  return matches;
};

const createRounds = (athletes: Judoka[]): Rounds => {
  const athletesCount = athletes.length;
  const winnerRounds = Math.log2(athletesCount);

  const rounds: Rounds = [];

  let winnerAthletesCount = athletesCount / 2;
  for (let round = 1; round <= winnerRounds; round++) {
    const isFirstRound = round === 1;
    const create = createMatches(winnerAthletesCount)(isFirstRound ? athletes : undefined);
    const isLastRound = round === winnerRounds;
    const isFirstOrLast = isFirstRound || isLastRound;
    const roundMatch = {
      round,
      winner: create(),
      loser: isFirstOrLast ? [] : create(),
      repechage: isFirstOrLast ? [] : create()
    };
    rounds.push(roundMatch);
    winnerAthletesCount /= 2;
  }

  return rounds;
};

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
