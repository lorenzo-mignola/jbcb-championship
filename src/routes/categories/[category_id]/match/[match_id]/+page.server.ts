import { getCategory } from '$lib/db/methods';
import type { Category } from '../../../../../lib/types/category.type';
import type { Match } from '../../../../../lib/types/match.type';
import { isByeMatch } from '../../../../../lib/utils/category';
import type { PageServerLoad } from './$types';

type Output =
  | {
      category: undefined;
    }
  | {
      category: Pick<Category, 'name' | 'duration'> & { _id: string };
      match: Match;
      nextMatch: Match | undefined;
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

  const match = category.matches[matchIndex];
  const nextMatch = category.matches.slice(matchIndex + 1).find((m) => !isByeMatch(m));

  return {
    category: {
      _id: category._id.toString(),
      name: category.name,
      duration: category.duration
    },
    match,
    nextMatch
  };
};
