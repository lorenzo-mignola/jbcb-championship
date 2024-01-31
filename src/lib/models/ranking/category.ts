import { complement, descend, prop, sortWith } from 'ramda';
import type { Category, DoublePoolCategory } from '../../types/category.type';
import type { Judoka } from '../../types/judoka.type';
import type { Match, MatchWithWinner } from '../../types/match.type';
import { getOpponentType } from '../../utils/judoka';

export interface RankingAthlete {
  id?: string;
  rank: number;
  matchPoint?: number;
  evaluationPoint?: number;
}

interface RankingWithEven {
  opponentWin: string[];
  remainingTimeInWin: number;
  matchPoint: number;
  evaluationPoint: number;
  id: string;
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

export const getRankingPool = (matches: Match[], athletes: Judoka[]) => {
  const athleteMap: Record<
    string,
    { matchPoint: number; evaluationPoint: number; remainingTimeInWin: number }
  > = athletes.reduce((map, athlete) => {
    const { id } = athlete;
    return {
      ...map,
      [id]: { matchPoint: 0, evaluationPoint: 0, remainingTimeInWin: 0 }
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
    if (!match.finalTime) {
      return;
    }
    const remainingTimeInWin = match.finalTime * (match.goldenScore ? -1 : 1);
    athleteMap[winner.id].remainingTimeInWin += remainingTimeInWin;
  });

  const rankingWithEven: RankingWithEven[] = Object.entries(athleteMap)
    .map(([id, points]) => ({ id, ...points }))
    .map((athleteRank) => {
      const win = matches.filter((match): match is MatchWithWinner => {
        const { winner } = match;
        if (!winner) {
          return false;
        }
        return match[winner]?.id === athleteRank.id;
      });

      const opponentWin = win
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
        .map((winMatch) => winMatch[getOpponentType(winMatch.winner)!]?.id)
        .filter((id): id is string => Boolean(id));
      return { ...athleteRank, opponentWin };
    })
    .sort((a, b) => {
      if (a.matchPoint === b.matchPoint) {
        return b.evaluationPoint - a.evaluationPoint;
      }
      return b.matchPoint - a.matchPoint;
    });

  const sortByDirect = (a: RankingWithEven, b: RankingWithEven) => {
    const aIsWinnerDirect = a.opponentWin.includes(b.id);
    if (aIsWinnerDirect) {
      return -1;
    }
    const bIsWinnerDirect = a.opponentWin.includes(b.id);
    if (bIsWinnerDirect) {
      return 1;
    }

    return 0;
  };

  const sortByDirectOrTime = (a: RankingWithEven, b: RankingWithEven) => {
    // if (false) {
    //   return a.remainingTimeInWin < b.remainingTimeInWin ? 1 : -1;
    // }
    // return a.opponentWin.includes(b.id) ? 1 : -1;
    // return ascend(prop<RankingAthlete>(''));
    return sortByDirect(a, b);
  };

  const sorted = sortWith<RankingWithEven>([
    descend(prop('matchPoint')),
    descend(prop('evaluationPoint')),
    sortByDirectOrTime
  ])(rankingWithEven);

  return sorted.map<RankingAthlete>((athleteRank, index) => ({
    id: athleteRank.id,
    rank: index + 1,
    matchPoint: athleteRank.matchPoint,
    evaluationPoint: athleteRank.evaluationPoint
  }));
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
