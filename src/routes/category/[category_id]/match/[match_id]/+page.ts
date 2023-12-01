import { getCategory } from '../../../../../lib/db/methods';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const category = getCategory(params.category_id);
  const match = category?.matches.find((match) => match.id === params.match_id);
  return {
    category,
    match
  };
};
