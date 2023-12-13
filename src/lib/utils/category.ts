import type { Category, PoolCategory } from '../types/Category';
import type { Judoka } from '../types/Judoka';
import type { Match } from '../types/Match';

export const getRanking = (category: Category) => {
  if (category.type === 'pool') {
    return getRankingPool((category as PoolCategory).matches, category.athletes);
  }
  return [];
};

const getRankingPool = (matches: Match[], athletes: Judoka[]) => {
  const athleteMap: Record<string, { matchPoint: number; evaluationPoint: number }> =
    athletes.reduce((map, athlete) => {
      const { id } = athlete;
      return {
        ...map,
        [id]: { matchPoint: 0, evaluationPoint: 0 }
      };
    }, {});

  matches.forEach((match) => {
    if (!match.winner) {
      return;
    }
    const winner = match[match.winner];
    athleteMap[winner.id].matchPoint += 2;
    const evaluationPoint = winner.ippon === 1 ? 10 : 7;
    athleteMap[winner.id].evaluationPoint += evaluationPoint;
  });

  return Object.entries(athleteMap)
    .map(([id, points]) => ({ id, ...points }))
    .sort((a, b) => {
      if (a.matchPoint === b.matchPoint) {
        return b.evaluationPoint - a.evaluationPoint;
      }
      return b.matchPoint - a.matchPoint;
    })
    .map((athlete, index) => ({ ...athlete, rank: index + 1 }));
};
