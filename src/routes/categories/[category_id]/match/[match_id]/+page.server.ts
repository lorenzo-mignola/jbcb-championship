import { getCategory } from '$lib/db/methods.server';
import { isByeMatch } from '../../../../../lib/utils/category';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
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
      category
    };
  }

  const match = category.matches[matchIndex];
  const nextMatch = category.matches.slice(matchIndex + 1).find((m) => !isByeMatch(m));

  return {
    category,
    match,
    nextMatch
  };
};
