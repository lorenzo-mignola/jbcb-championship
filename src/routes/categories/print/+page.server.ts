import { getAllCategories } from '#lib/db';
import { sortCategories } from '#lib/utils/categories-utils';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament ?? '');

  return {
    categories: sortCategories(categories),
  };
};
