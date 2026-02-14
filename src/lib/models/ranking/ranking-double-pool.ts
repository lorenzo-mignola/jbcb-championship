import type { DoublePoolCategory } from '../../types/category.type';

import { getOpponentType } from '../../utils/judoka-utils';

export function getRankingDoublePool(
  semifinals: DoublePoolCategory['semifinals'],
  finalMatch: DoublePoolCategory['finalMatch'],
) {
  const winnerFinal = finalMatch.winner;
  if (!winnerFinal) {
    return [];
  }
  const gold = finalMatch[winnerFinal];
  const silver = finalMatch[getOpponentType(winnerFinal)!];
  const [firstSemi, secondSemi] = semifinals;
  const firstSemiLoser = getOpponentType(firstSemi.winner ?? null);
  const secondSemiLoser = getOpponentType(secondSemi.winner ?? null);
  if (!firstSemiLoser || !secondSemiLoser) {
    return [];
  }
  const bronze1 = firstSemi[firstSemiLoser];
  const bronze2 = secondSemi[secondSemiLoser];

  const ranking = [];

  if (gold) {
    ranking.push({
      id: gold.id,
      rank: 1,
    });
  }

  if (silver) {
    ranking.push({
      id: silver.id,
      rank: 2,
    });
  }

  if (bronze1) {
    ranking.push({
      id: bronze1.id,
      rank: 3,
    });
  }

  if (bronze2) {
    ranking.push({
      id: bronze2.id,
      rank: 3,
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
}
