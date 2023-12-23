import { produce } from 'immer';
import type { BracketsCategory } from '../../../types/Category';
import type { JudokaType, Match } from '../../../types/Match';
import { getOpponentType } from '../../../utils/judoka';
import { getMatches } from './createMatches';

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
  const isOddMatch = matchIndex % 2 !== 0;
  const isWhiteOrBlueNext: JudokaType = isOddMatch ? 'blue' : 'white';

  const currentRoundUpdated = produce(brackets.rounds[currentCoordinate.round], (round) => {
    round.winner[currentCoordinate.match] = match;
  });

  const nextCoordinate = {
    round: roundIndex + 1,
    match: Math.floor(matchIndex / 2),
    whiteOrBlue: isWhiteOrBlueNext
  };
  const winner = match[match.winner];
  const nextRoundUpdated = produce(brackets.rounds[nextCoordinate.round], (round) => {
    round.winner[nextCoordinate.match][nextCoordinate.whiteOrBlue] = winner;
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
