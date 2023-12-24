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

  // TODO handle first round
  const loserCoordinate: NextMatchCoordinate = {
    match: Math.floor(match / 2),
    whiteOrBlue
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

  const currentRoundUpdated = produce(brackets.rounds[currentCoordinate.round], (round) => {
    round.winner[currentCoordinate.match] = match;
  });

  const winner = match[match.winner];
  const loser = match[loserType];
  const isLastRound = nextCoordinate.round === brackets.rounds.length - 1;
  const nextRoundUpdated = produce(brackets.rounds[nextCoordinate.round], (round) => {
    // winner
    round.winner[nextCoordinate.winner.match][nextCoordinate.winner.whiteOrBlue] = winner;
    if (isLastRound) {
      return;
    }
    // TODO handle first round
    // loser
    round.loser[nextCoordinate.loser.match][nextCoordinate.loser.whiteOrBlue] = loser;
  });

  const roundsUpdated = produce(brackets.rounds, (rounds) => {
    rounds[currentCoordinate.round] = currentRoundUpdated;
    rounds[nextCoordinate.round] = nextRoundUpdated;
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
