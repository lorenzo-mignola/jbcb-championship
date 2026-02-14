import type { BracketsCategory } from '$lib/types/category.type';
import type { Match } from '$lib/types/match.type';
import type { BracketRound, Rounds } from '$lib/types/rounds.type';

export function getRoundByMatch(
  rounds: Rounds,
  match: Match,
  type: 'winner' | 'loser' | 'repechage',
) {
  const roundIndex = rounds.findIndex(round =>
    round[type].some(({ id }) => id === match.id),
  );

  if (roundIndex === -1) {
    return {
      round: null,
      roundIndex: null,
    };
  }

  return {
    round: rounds[roundIndex],
    roundIndex,
  };
}

export function getMatchIndex(
  round: BracketRound,
  match: Match,
  type: 'winner' | 'loser' | 'repechage',
) {
  const matchIndex = round[type].findIndex(({ id }) => id === match.id);

  if (matchIndex === -1) {
    return null;
  }
  return matchIndex;
}

export function isWhiteOrBlueNext(matchIndex: number) {
  const isOddMatch = matchIndex % 2 !== 0;
  return isOddMatch ? 'blue' : 'white';
}

export function getMatchType(brackets: BracketsCategory, match: Match) {
  const winnerMatch = brackets.rounds.flatMap(round =>
    round.winner.map(m => m.id),
  );
  if (winnerMatch.includes(match.id)) {
    return 'winner';
  }
  const loserMatch = brackets.rounds.flatMap(round =>
    round.loser.map(m => m.id),
  );
  if (loserMatch.includes(match.id)) {
    return 'loser';
  }
  const repechageMatch = brackets.rounds.flatMap(round =>
    round.repechage.map(m => m.id),
  );
  if (repechageMatch.includes(match.id)) {
    return 'repechage';
  }
  return null;
}
