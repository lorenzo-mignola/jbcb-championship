import { produce } from 'immer';
import { descend, prop, sortWith } from 'ramda';

import type { Category, RankingAthlete } from '../../types/category.type';

import { getRanking } from './category';

type RankingWithClub = RankingAthlete & {
  club: string | undefined;
};

type ClubRanking = Record<string, number[]>;

type ClubRankingSum = Record<'gold' | 'silver' | 'bronze', number>;

function addClub(category: Category) {
  return (rankingAthlete: RankingAthlete) => ({
    ...rankingAthlete,
    club: category.athletes.find(athlete => athlete.id === rankingAthlete.id)
      ?.club,
  });
}

function getClubRanking(ranking: RankingWithClub[]) {
  return ranking.reduce<ClubRanking>((rankByClub, rankAthlete) => {
    const { club, rank } = rankAthlete;
    if (!club) {
      return rankByClub;
    }
    if (!rankByClub[club]) {
      return {
        ...rankByClub,
        [club]: [rank],
      };
    }
    return produce(rankByClub, (draftRankByClub) => {
      draftRankByClub[club].push(rank);
    });
  }, {});
}

function sumMedalByClub(clubRanking: ClubRanking[string]) {
  return clubRanking.reduce<ClubRankingSum>(
    (sumRank, rank) => {
      if (rank === 1) {
        const a = produce(sumRank, (ranking) => {
          ranking.gold += 1;
        });
        return a;
      }
      if (rank === 2) {
        return produce(sumRank, (ranking) => {
          ranking.silver += 1;
        });
      }
      if (rank === 3 || rank === 4) {
        return produce(sumRank, (ranking) => {
          ranking.bronze += 1;
        });
      }

      return sumRank;
    },
    { bronze: 0, gold: 0, silver: 0 },
  );
}

export function getClubRaking(categories: Category[]) {
  const ranking = categories.flatMap(category =>
    getRanking(category).map(addClub(category)),
  );
  const clubRanking = getClubRanking(ranking);
  const clubRankingSum = Object.entries(clubRanking).map(
    ([name, rank]) => ({
      name,
      ...sumMedalByClub(rank),
    }),
    {},
  );
  return sortWith<(typeof clubRankingSum)[number]>([
    descend(prop('gold')),
    descend(prop('silver')),
    descend(prop('bronze')),
  ])(clubRankingSum);
  return clubRankingSum;
}
