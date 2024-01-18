import { produce } from 'immer';
import type { Category } from '../../types/category.type';

import { getRanking, type RankingAthlete } from './category';

const addClub = (category: Category) => (rankingAthlete: RankingAthlete) => ({
  ...rankingAthlete,
  club: category.athletes.find((athlete) => athlete.id === rankingAthlete.id)?.club
});

type ClubRanking = Record<
  string,
  {
    id: string | undefined;
    rank: number;
  }[]
>;

export const getClubRaking = (categories: Category[]) => {
  const ranking = categories.flatMap((category) => getRanking(category).map(addClub(category)));
  const clubRanking = ranking.reduce<ClubRanking>((rankByClub, rankAthlete) => {
    const { club, id, rank } = rankAthlete;
    if (!club) {
      return rankByClub;
    }
    // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- false positive
    if (!rankByClub[club]) {
      return {
        ...rankByClub,
        [club]: [{ id, rank }]
      };
    }
    return produce(rankByClub, (draftRankByClub) => {
      draftRankByClub[club].push({ id, rank });
    });
  }, {});
  return clubRanking;
};
