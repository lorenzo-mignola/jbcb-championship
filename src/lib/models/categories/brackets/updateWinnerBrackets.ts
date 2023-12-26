import { produce } from 'immer';
import type { BracketRound, BracketsCategory } from '../../../types/Category';
import type { JudokaType, Match } from '../../../types/Match';
import { getOpponentType } from '../../../utils/judoka';
import { getMatchIndex, isWhiteOrBlueNext } from './findRoundAndMatch';
import { resetAthlete } from './resetAthlete';

interface NextMatchCoordinate {
  match: number;
  whiteOrBlue: JudokaType;
}

const getNextCoordinate = ({ round, match }: { round: number; match: number }) => {
  const whiteOrBlue = isWhiteOrBlueNext(match);

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

export const updateWinnerBrackets = (
  brackets: BracketsCategory,
  round: BracketRound,
  roundIndex: number,
  match: Match
) => {
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
      nextWinner[nextCoordinate.winner.match][nextCoordinate.winner.whiteOrBlue] = resetAthlete(winner);
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

  return produce(brackets.rounds, (rounds) => {
    rounds[currentCoordinate.round] = currentRoundUpdated;
    rounds[nextCoordinate.round].winner = nextRoundWinnerUpdated;
    rounds[nextCoordinate.round].loser = nextRoundLoserUpdated;
  });
};
