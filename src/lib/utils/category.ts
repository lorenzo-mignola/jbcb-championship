import type { Category } from '../types/Category';
import type { Judoka } from '../types/Judoka';
import type { Match } from '../types/Match';
import { getOpponentType } from './judoka';

interface RankingAthlete {
  id?: string;
  rank: number;
  matchPoint?: number;
  evaluationPoint?: number;
}

export const getRanking = (category?: Category): RankingAthlete[] => {
  if (!category) {
    return [];
  }

  // category is not ended
  if (category.currentMatch) {
    return [];
  }
  if (category.type === 'pool') {
    return getRankingPool(category.matches, category.athletes);
  }
  if (category.type === 'brackets') {
    return getRankingBrackets(category.matches);
  }
  return [];
};

const getRankingBrackets = (matches: Match[]) => {
  const lastMatchIndex = matches.length - 1;
  const goldFinal = matches[lastMatchIndex];
  const firstBronzeFinal = matches[lastMatchIndex - 1];
  const secondBronzeFinal = matches[lastMatchIndex - 2];

  const ranking = [];

  if (goldFinal.winner) {
    ranking.push({
      rank: 1,
      id: goldFinal[goldFinal.winner]?.id
    });
    ranking.push({
      rank: 2,
      id: goldFinal[getOpponentType(goldFinal.winner)!]?.id
    });
  }

  if (firstBronzeFinal.winner) {
    ranking.push({
      rank: 3,
      id: firstBronzeFinal[firstBronzeFinal.winner]?.id
    });
    ranking.push({
      rank: 5,
      id: firstBronzeFinal[getOpponentType(firstBronzeFinal.winner)!]?.id
    });
  }
  if (secondBronzeFinal.winner) {
    ranking.push({
      rank: 3,
      id: secondBronzeFinal[secondBronzeFinal.winner]?.id
    });
    ranking.push({
      rank: 5,
      id: secondBronzeFinal[getOpponentType(secondBronzeFinal.winner)!]?.id
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
};

export const getRankingPool = (matches: Match[], athletes: Judoka[]) => {
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
    if (!winner) {
      return;
    }
    athleteMap[winner.id].matchPoint += 2;
    const evaluationPoint = winner.ippon === 1 || winner.wazari === 2 ? 10 : 7;
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

export const isByeMatch = ({ white, blue }: Match) => !white || !blue;

export const getRankingIcon = (rankValue: number) => {
  switch (rankValue) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
    case 4:
      return '🥉';

    default:
      return `#${rankValue}`;
  }
};

export const shuffleArray = <T>(originalArray: T[]) => {
  const array: T[] = JSON.parse(JSON.stringify(originalArray));
  return array.sort(() => Math.random() - 0.5);
};
