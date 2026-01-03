import { produce } from 'immer';

import type { BracketsCategory } from '$lib/types/category.type';
import type { JudokaType, Match } from '$lib/types/match.type';
import type { BracketRound } from '$lib/types/rounds.type';

import { getOpponentType } from '../../../utils/judoka-utils';
import { getMatchIndex, isWhiteOrBlueNext } from './find-round-and-match';
import { resetAthlete } from './reset-athlete';

interface NextMatchCoordinate {
  match: number;
  whiteOrBlue: JudokaType;
}

function getNextCoordinate(
  { match, round }: { round: number; match: number },
  winnerMatches: number,
) {
  const whiteOrBlue = isWhiteOrBlueNext(match);

  const winnerCoordinate: NextMatchCoordinate = {
    match: Math.floor(match / 2),
    whiteOrBlue,
  };

  const isFirstRound = round === 0;
  const isOddRound = round % 2 !== 0;
  const loserCoordinate: NextMatchCoordinate = isFirstRound
    ? {
        match: Math.floor(match / 2),
        whiteOrBlue,
      }
    : {
        match: isOddRound ? winnerMatches - 1 - match : match,
        whiteOrBlue: 'white',
      };

  return {
    loser: loserCoordinate,
    round: round + 1,
    winner: winnerCoordinate,
  };
}

export function updateWinnerBrackets(
  brackets: BracketsCategory,
  round: BracketRound,
  roundIndex: number,
  match: Match,
) {
  if (!match.winner) {
    return brackets.rounds;
  }
  const loserType = getOpponentType(match.winner);
  if (!loserType) {
    return brackets.rounds;
  }

  const matchIndex = getMatchIndex(round, match, 'winner');

  if (matchIndex === null) {
    return brackets.rounds;
  }

  const currentCoordinate = {
    match: matchIndex,
    round: roundIndex,
  };
  const winnerMatches = round.winner.length;
  const nextCoordinate = getNextCoordinate(currentCoordinate, winnerMatches);

  const loser = match[loserType];
  const winner = match[match.winner];

  const isLastRound = nextCoordinate.round === brackets.rounds.length;
  if (isLastRound) {
    return produce(brackets.rounds, (rounds) => {
      rounds[currentCoordinate.round].winner[currentCoordinate.match] = match;
    });
  }

  const currentRoundUpdated = produce(
    brackets.rounds[currentCoordinate.round],
    (roundToUpdate) => {
      roundToUpdate.winner[currentCoordinate.match] = match;
      if (currentCoordinate.round !== 0) {
        roundToUpdate.repechage[nextCoordinate.loser.match][
          nextCoordinate.loser.whiteOrBlue
        ] = resetAthlete(loser);
      }
    },
  );

  const nextRoundWinnerUpdated = produce(
    brackets.rounds[nextCoordinate.round].winner,
    (nextWinner) => {
      nextWinner[nextCoordinate.winner.match][
        nextCoordinate.winner.whiteOrBlue
      ] = resetAthlete(winner);
    },
  );

  const nextRoundLoserUpdated = produce(
    brackets.rounds[nextCoordinate.round].loser,
    (nextLoser) => {
      if (currentCoordinate.round === 0 && brackets.rounds.length > 2) {
        nextLoser[nextCoordinate.loser.match][
          nextCoordinate.loser.whiteOrBlue
        ] = resetAthlete(loser);
      }
    },
  );

  return produce(brackets.rounds, (rounds) => {
    rounds[currentCoordinate.round] = currentRoundUpdated;
    rounds[nextCoordinate.round].winner = nextRoundWinnerUpdated;
    rounds[nextCoordinate.round].loser = nextRoundLoserUpdated;
  });
}
