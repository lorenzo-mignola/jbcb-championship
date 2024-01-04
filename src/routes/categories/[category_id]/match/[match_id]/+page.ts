import { getCategory } from '../../../../../lib/db/methods';
import { isByeMatch } from '../../../../../lib/utils/category';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const { category_id, match_id } = params;
  const category = getCategory(category_id);

  const matchIndex = category?.matches.findIndex((match) => match.id === match_id);

  if (matchIndex === undefined) {
    return {
      category
    };
  }

  const match = category?.matches[matchIndex];
  const nextMatch = category?.matches.slice(matchIndex + 1).find((m) => !isByeMatch(m));

  return {
    category,
    match,
    nextMatch
  };
};
