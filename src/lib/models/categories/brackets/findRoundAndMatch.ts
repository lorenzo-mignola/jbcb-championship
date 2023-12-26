import type { BracketRound, BracketsCategory, Rounds } from '../../../types/Category';
import type { Match } from '../../../types/Match';

export const getRoundByMatch = (
  rounds: Rounds,
  match: Match,
  type: 'winner' | 'loser' | 'repechage'
) => {
  const roundIndex = rounds.findIndex((round) => round[type].some(({ id }) => id === match.id));

  if (roundIndex === -1) {
    return {
      round: null,
      roundIndex: null
    };
  }

  return {
    round: rounds[roundIndex],
    roundIndex
  };
};

export const getMatchIndex = (
  round: BracketRound,
  match: Match,
  type: 'winner' | 'loser' | 'repechage'
) => {
  const matchIndex = round[type].findIndex(({ id }) => id === match.id);

  if (matchIndex === -1) {
    return null;
  }
  return matchIndex;
};

export const isWhiteOrBlueNext = (matchIndex: number) => {
  const isOddMatch = matchIndex % 2 !== 0;
  return isOddMatch ? 'blue' : 'white';
};

export const getMatchType = (brackets: BracketsCategory, match: Match) => {
  const winnerMatch = brackets.rounds.flatMap((round) => round.winner.map((m) => m.id));
  if (winnerMatch.includes(match.id)) {
    return 'winner';
  }
  const loserMatch = brackets.rounds.flatMap((round) => round.loser.map((m) => m.id));
  if (loserMatch.includes(match.id)) {
    return 'loser';
  }
  const repechageMatch = brackets.rounds.flatMap((round) => round.repechage.map((m) => m.id));
  if (repechageMatch.includes(match.id)) {
    return 'repechage';
  }
  return null;
};
