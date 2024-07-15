import { produce } from 'immer';
import { descend, prop, sortWith } from 'ramda';

import type { Category, RankingAthlete } from '../../types/category.type';
import { getRanking } from './category';

type RankingWithClub = RankingAthlete & {
  club: string | undefined;
};

type ClubRanking = Record<string, number[]>;

type ClubRankingSum = Record<'gold' | 'silver' | 'bronze', number>;

const addClub = (category: Category) => (rankingAthlete: RankingAthlete) => ({
  ...rankingAthlete,
  club: category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.club
});

function getClubRanking(ranking: RankingWithClub[]) {
  return ranking.reduce<ClubRanking>((rankByClub, rankAthlete) => {
    const { club, rank } = rankAthlete;
    if (!club) {
      return rankByClub;
    }
    // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- false positive
    if (!rankByClub[club]) {
      return {
        ...rankByClub,
        [club]: [rank]
      };
    }
    return produce(rankByClub, (draftRankByClub) => {
      draftRankByClub[club].push(rank);
    });
  }, {});
}

const sumMedalByClub = (clubRanking: ClubRanking[string]) =>
  clubRanking.reduce<ClubRankingSum>(
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
    { gold: 0, silver: 0, bronze: 0 }
  );

export const getClubRaking = (categories: Category[]) => {
  const ranking = categories.flatMap((category) => getRanking(category).map(addClub(category)));
  const clubRanking = getClubRanking(ranking);
  const clubRankingSum = Object.entries(clubRanking).map(
    ([name, rank]) => ({
      name,
      ...sumMedalByClub(rank)
    }),
    {}
  );
  return sortWith<(typeof clubRankingSum)[number]>([
    descend(prop('gold')),
    descend(prop('silver')),
    descend(prop('bronze'))
  ])(clubRankingSum);
  return clubRankingSum;
};
