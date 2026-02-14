import type { Match } from '../../types/match.type';

import { getOpponentType } from '../../utils/judoka-utils';

export function getRankingBrackets(matches: Match[]) {
  const lastMatchIndex = matches.length - 1;
  if (lastMatchIndex < 0) {
    return [];
  }
  const goldFinal = matches[lastMatchIndex];
  const firstBronzeFinal = matches[lastMatchIndex - 1];
  const secondBronzeFinal = matches[lastMatchIndex - 2];

  const ranking = [];

  if (goldFinal.winner) {
    ranking.push({
      id: goldFinal[goldFinal.winner]?.id,
      rank: 1,
    });
    ranking.push({
      id: goldFinal[getOpponentType(goldFinal.winner)!]?.id,
      rank: 2,
    });
  }

  if (firstBronzeFinal.winner) {
    ranking.push({
      id: firstBronzeFinal[firstBronzeFinal.winner]?.id,
      rank: 3,
    });
    ranking.push({
      id: firstBronzeFinal[getOpponentType(firstBronzeFinal.winner)!]?.id,
      rank: 5,
    });
  }
  if (secondBronzeFinal.winner) {
    ranking.push({
      id: secondBronzeFinal[secondBronzeFinal.winner]?.id,
      rank: 3,
    });
    ranking.push({
      id: secondBronzeFinal[getOpponentType(secondBronzeFinal.winner)!]?.id,
      rank: 5,
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
}
