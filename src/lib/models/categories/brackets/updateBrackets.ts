import { produce } from 'immer';
import type { BracketsCategory } from '../../../types/Category';
import type { JudokaType, Match } from '../../../types/Match';
import { getOpponentType } from '../../../utils/judoka';
import { getMatches } from './createMatches';

interface NextMatchCoordinate {
  match: number;
  whiteOrBlue: JudokaType;
}

const getNextCoordinate = ({ round, match }: { round: number; match: number }) => {
  const isOddMatch = match % 2 !== 0;
  const whiteOrBlue = isOddMatch ? 'blue' : 'white';

  const winnerCoordinate: NextMatchCoordinate = {
    match: Math.floor(match / 2),
    whiteOrBlue
  };

  const loserCoordinate: NextMatchCoordinate = {
    match: Math.floor(match / 2),
    whiteOrBlue: round === 0 ? whiteOrBlue : 'white'
  };

  return {
    round: round + 1,
    winner: winnerCoordinate,
    loser: loserCoordinate
  };
};

export const updateBrackets = (brackets: BracketsCategory, match: Match) => {
  if (!match.winner) {
    return brackets;
  }
  const loserType = getOpponentType(match.winner);
  if (!loserType) {
    return brackets;
  }

  const roundIndex = brackets.rounds.findIndex(({ winner }) =>
    winner.some(({ id }) => id === match.id)
  );

  if (roundIndex === -1) {
    return brackets;
  }

  const round = brackets.rounds[roundIndex];
  const matchIndex = round.winner.findIndex(({ id }) => id === match.id);

  if (roundIndex === -1) {
    return brackets;
  }

  const currentCoordinate = {
    round: roundIndex,
    match: matchIndex
  };
  const nextCoordinate = getNextCoordinate(currentCoordinate);

  const loser = match[loserType];
  const winner = match[match.winner];

  const currentRoundUpdated = produce(brackets.rounds[currentCoordinate.round], (round) => {
    round.winner[currentCoordinate.match] = match;
    if (currentCoordinate.round !== 0) {
      round.repechage[nextCoordinate.loser.match][nextCoordinate.loser.whiteOrBlue] = loser;
    }
  });

  const nextRoundWinnerUpdated = produce(
    brackets.rounds[nextCoordinate.round].winner,
    (nextWinner) => {
      nextWinner[nextCoordinate.winner.match][nextCoordinate.winner.whiteOrBlue] = winner;
    }
  );

  const isLastRound = nextCoordinate.round === brackets.rounds.length - 1;
  const nextRoundLoserUpdated = produce(
    brackets.rounds[nextCoordinate.round].loser,
    (nextLoser) => {
      if (!isLastRound) {
        nextLoser[nextCoordinate.loser.match][nextCoordinate.loser.whiteOrBlue] = loser;
      }
    }
  );

  const roundsUpdated = produce(brackets.rounds, (rounds) => {
    rounds[currentCoordinate.round] = currentRoundUpdated;
    rounds[nextCoordinate.round].winner = nextRoundWinnerUpdated;
    rounds[nextCoordinate.round].loser = nextRoundLoserUpdated;
  });
  // const isOddRound = roundIndex % 2 !== 0;
  // const nextRoundMatchesLength = nextRound.winner.length;
  // const loserNextMatchInRound = Math.floor(
  //   (isOddRound ? nextRoundMatchesLength - 1 - matchIndex : 0 + matchIndex) / 2
  // );

  const matches = getMatches(roundsUpdated);

  return {
    ...brackets,
    rounds: roundsUpdated,
    matches
  };
};
