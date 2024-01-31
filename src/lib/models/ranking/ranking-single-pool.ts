import { descend, prop, sortWith } from 'ramda';
import type { RankingAthlete } from '../../types/category.type';
import type { Judoka } from '../../types/judoka.type';
import type { Match, MatchWithWinner } from '../../types/match.type';
import { getOpponentType } from '../../utils/judoka';

interface RankingWithEven {
  opponentWin: string[];
  remainingTimeInWin: number;
  matchPoint: number;
  evaluationPoint: number;
  id: string;
}

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

const getLosersOf = (allRankings: RankingWithEven[]) => (id: string) =>
  allRankings.find((rank) => rank.id === id);

// check if there's a circle of beating (A->B, B->C, C->A)
const isCircle =
  (getLoserFn: (id: string) => RankingWithEven | undefined) =>
  (evaluationPoints: number, matchPoints: number) =>
  (id: string, opponentId: string) => {
    const losers = getLoserFn(id);
    if (!losers) {
      return;
    }
    if (losers.evaluationPoint !== evaluationPoints || losers.matchPoint !== matchPoints) {
      return false;
    }
    return losers.opponentWin.includes(opponentId);
  };

const isCircleOfBeating =
  (allRankings: RankingWithEven[]) => (a: RankingWithEven, b: RankingWithEven) => {
    const aWinAgainstB = a.opponentWin.includes(b.id);
    const bWinAgainstA = b.opponentWin.includes(a.id);

    if (!aWinAgainstB && !bWinAgainstA) {
      return false;
    }

    const { evaluationPoint, matchPoint } = a;
    const isCircleBy = isCircle(getLosersOf(allRankings))(evaluationPoint, matchPoint);

    const isCircleByB = b.opponentWin.some((idWinB) => isCircleBy(idWinB, a.id));
    const isCircleByA = a.opponentWin.some((idWinA) => isCircleBy(idWinA, b.id));

    return isCircleByA || isCircleByB;
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
    });

  const isCircleOfBeatingOfRankings = isCircleOfBeating(rankingWithEven);

  const sortByDirectOrTime = (a: RankingWithEven, b: RankingWithEven) => {
    if (isCircleOfBeatingOfRankings(a, b)) {
      return b.remainingTimeInWin - a.remainingTimeInWin;
    }
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
