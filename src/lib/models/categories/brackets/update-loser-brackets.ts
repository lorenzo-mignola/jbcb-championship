import { produce } from 'immer';

import type { BracketsCategory } from '$lib/types/category.type';
import type { Match } from '$lib/types/match.type';
import type { BracketRound } from '$lib/types/rounds.type';

import { getMatchIndex, isWhiteOrBlueNext } from './find-round-and-match';
import { resetAthlete } from './reset-athlete';

export function updateLoserBrackets(
  brackets: BracketsCategory,
  round: BracketRound,
  roundIndex: number,
  match: Match,
  type: 'loser' | 'repechage',
) {
  if (!match.winner) {
    return brackets.rounds;
  }
  const matchIndex = getMatchIndex(round, match, type);

  if (matchIndex === null) {
    return brackets.rounds;
  }

  const winner = match[match.winner];

  const nextMatchIndex
    = type === 'loser' ? matchIndex : Math.floor(matchIndex / 2);

  const currentRoundUpdated = produce(round, (currentRound) => {
    if (type === 'loser') {
      currentRound.repechage[nextMatchIndex].blue = resetAthlete(winner);
    }
    currentRound[type][matchIndex] = match;
  });

  const nextRoundIndex = roundIndex + 1;
  const nextRoundUpdated = produce(
    brackets.rounds[nextRoundIndex],
    (nextRound) => {
      if (type === 'loser') {
        return;
      }
      const isLastRound = nextRoundIndex === brackets.rounds.length - 1;
      if (!isLastRound) {
        const whiteOrBlue = isWhiteOrBlueNext(matchIndex);
        nextRound.loser[nextMatchIndex][whiteOrBlue] = resetAthlete(winner);
      }
    },
  );

  return produce(brackets.rounds, (rounds) => {
    rounds[roundIndex] = currentRoundUpdated;
    rounds[roundIndex + 1] = nextRoundUpdated;
  });
}
