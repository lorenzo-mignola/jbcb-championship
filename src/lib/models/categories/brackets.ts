import { nanoid } from 'nanoid';
import type { BracketsCategory, Rounds } from '../../types/Category';
import type { Judoka } from '../../types/Judoka';
import type { Match } from '../../types/Match';
import { getRandomElement } from '../../utils/match';
import { createMatch } from '../match';

const removeAthlete =
  <T extends Judoka | undefined>(notPicket: T[]) =>
  (whiteOrBlue: Judoka | undefined) => {
    if (!whiteOrBlue) {
      const undefinedAthletes = notPicket.filter((athlete) => athlete === undefined);
      const notUndefinedAthletes = notPicket.filter((athlete) => athlete !== undefined);
      undefinedAthletes.pop();
      return [...notUndefinedAthletes, ...undefinedAthletes];
    }

    return notPicket.filter((athlete) => athlete?.id !== whiteOrBlue.id);
  };

const createMatches =
  (matchInRound: number) =>
  (athletes?: (Judoka | undefined)[], byeAthletes?: (Judoka | undefined)[]) =>
  () => {
    const matches: Match[] = [];
    let athletesNotPicket = athletes;
    for (let index = 0; index < matchInRound; index++) {
      if (!athletes || !athletesNotPicket) {
        matches.push(createMatch());
        continue;
      }

      if (athletesNotPicket.length === 0) {
        break;
      }

      const { athlete: white, remain: remainAthletesNotPicketAfterWhite } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterWhite;

      const { athlete: blue, remain: remainAthletesNotPicketAfterBlue } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterBlue;

      matches.push(createMatch(white, blue));
    }

    // add bye match
    byeAthletes?.forEach((athlete) => {
      matches.push(createMatch(athlete, undefined));
    });
    return matches;
  };

const createRounds = (athletes: Judoka[]): Rounds => {
  const { athletesCount, winnerRounds, athleteFirstRound, byeAthletes } =
    getCountsAndFirstRound(athletes);

  const rounds: Rounds = [];

  let winnerAthletesCount = athletesCount / 2;
  for (let round = 1; round <= winnerRounds; round++) {
    const isFirstRound = round === 1;
    const createWithCount = createMatches(winnerAthletesCount);
    const create = isFirstRound
      ? createWithCount(athleteFirstRound, byeAthletes)
      : createWithCount();
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
function pickAthlete(athletesNotPicket: (Judoka | undefined)[]) {
  const athlete = getRandomElement(athletesNotPicket);
  const remain = removeAthlete(athletesNotPicket)(athlete);
  return { athlete, remain };
}

function getCountsAndFirstRound(athletes: Judoka[]) {
  const athletesCount = athletes.length;
  const winnerRounds = Math.log2(athletesCount);

  if (winnerRounds === Math.floor(winnerRounds)) {
    return {
      athletesCount,
      winnerRounds,
      athleteFirstRound: athletes,
      byeAthletes: []
    };
  }

  const nextWinnerRounds = Math.floor(winnerRounds) + 1;
  const athletesCountCeil = 2 ** nextWinnerRounds;
  let remainAthletes = athletes;
  const athletesToPick = athletesCount - (athletesCountCeil - athletesCount);
  const athleteFirstRound = Array.from({
    length: athletesToPick
  }).map(() => {
    const picked = getRandomElement(remainAthletes);
    remainAthletes = removeAthlete(remainAthletes)(picked);
    return picked;
  });

  return {
    winnerRounds: nextWinnerRounds,
    athletesCount: athletesCountCeil,
    athleteFirstRound,
    byeAthletes: remainAthletes
  };
}
