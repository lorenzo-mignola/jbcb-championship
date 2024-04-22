import { getCategory } from '$lib/server/methods';

import { isNotByeMatch } from '../../../../../lib/models/ranking/category';
import type { Category } from '../../../../../lib/types/category.type';
import type { Match } from '../../../../../lib/types/match.type';
import type { PageServerLoad } from './$types';

type Output =
  | {
      category: undefined;
    }
  | {
      category: Pick<Category, 'name' | 'duration'> & { id: string };
      match: Match;
      nextMatch: Match | undefined;
      isMedalMatch: boolean;
    };

export const load: PageServerLoad = async ({ params }): Promise<Output> => {
  const { category_id, match_id } = params;
  const category = await getCategory(category_id);

  if (!category) {
    return {
      category
    };
  }

  const matchIndex = category.matches.findIndex((match) => match.id === match_id);

  if (matchIndex === -1) {
    return {
      category: undefined
    };
  }

  const isMedalMatch = category.type !== 'pool' ? category.matches.length - matchIndex <= 3 : false;
  const match = category.matches[matchIndex];
  const nextMatch = category.matches.slice(matchIndex + 1).find(isNotByeMatch);

  return {
    category: {
      id: category.id.toString(),
      name: category.name,
      duration: category.duration
    },
    match,
    nextMatch,
    isMedalMatch
  };
};
