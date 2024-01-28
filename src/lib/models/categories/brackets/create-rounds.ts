import type { Judoka } from '$lib/types/judoka.type';
import type { Rounds } from '$lib/types/rounds.type';
import { getRandomElement } from '$lib/utils/match';
import { createMatches } from './create-matches';
import { removeAthlete } from './remove-athlete';

const getCountsAndFirstRound = (athletes: Judoka[]) => {
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
};

export const createRounds = (athletes: Judoka[]): Rounds => {
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
      winner: create(),
      loser: isFirstOrLast ? [] : create().map((match) => ({ ...match, isRepechage: true })),
      repechage: isFirstOrLast ? [] : create().map((match) => ({ ...match, isRepechage: true }))
    };
    rounds.push(roundMatch);
    winnerAthletesCount /= 2;
  }

  return rounds;
};
