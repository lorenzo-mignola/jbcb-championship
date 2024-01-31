import type { DoublePoolCategory } from '../../types/category.type';
import { getOpponentType } from '../../utils/judoka';

export const getRankingDoublePool = (
  semifinals: DoublePoolCategory['semifinals'],
  finalMatch: DoublePoolCategory['finalMatch']
) => {
  const winnerFinal = finalMatch.winner;
  if (!winnerFinal) {
    return [];
  }
  const gold = finalMatch[winnerFinal];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
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
      rank: 1,
      id: gold.id
    });
  }

  if (silver) {
    ranking.push({
      rank: 2,
      id: silver.id
    });
  }

  if (bronze1) {
    ranking.push({
      rank: 3,
      id: bronze1.id
    });
  }

  if (bronze2) {
    ranking.push({
      rank: 3,
      id: bronze2.id
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
};
