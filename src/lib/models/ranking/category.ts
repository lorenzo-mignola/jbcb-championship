import { complement } from 'ramda';
import type { Category, DoublePoolCategory } from '../../types/category.type';
import type { Judoka } from '../../types/judoka.type';
import type { Match } from '../../types/match.type';
import { getOpponentType } from '../../utils/judoka';

export interface RankingAthlete {
  id?: string;
  rank: number;
  matchPoint?: number;
  evaluationPoint?: number;
}

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

export const getRankingBrackets = (matches: Match[]) => {
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
      rank: 1,
      id: goldFinal[goldFinal.winner]?.id
    });
    ranking.push({
      rank: 2,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
      id: secondBronzeFinal[getOpponentType(secondBronzeFinal.winner)!]?.id
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
};

export const getRankingPool = (matches: Match[], athletes: Judoka[], evenPosition = true) => {
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
    .map((athlete, index) => ({ ...athlete, rank: index + 1 }))
    .reduce<Required<RankingAthlete>[]>((ranking, rank) => {
      if (!evenPosition) {
        return [...ranking, rank];
      }
      if (rank.rank > 5) {
        return [...ranking, rank];
      }

      const evenResult = ranking.find(
        (r) => r.evaluationPoint === rank.evaluationPoint && r.matchPoint === rank.matchPoint
      );
      if (!evenResult) {
        return [...ranking, rank];
      }
      return [...ranking, { ...rank, rank: evenResult.rank }];
    }, []);
};

export const isByeMatch = ({ white, blue }: Match) => !white || !blue;

export const isNotByeMatch = complement(isByeMatch);

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
  const array = JSON.parse(JSON.stringify(originalArray)) as T[];
  return array.sort(() => Math.random() - 0.5);
};

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
  if (category.type === 'double_pool') {
    return getRankingDoublePool(category.semifinals, category.finalMatch);
  }
  // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- used as switch case
  if (category.type === 'brackets') {
    return getRankingBrackets(category.matches);
  }
  return [];
};
