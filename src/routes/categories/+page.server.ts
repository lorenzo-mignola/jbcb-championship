import { map, pipe } from 'ramda';

import { getAllCategories } from '../../lib/server/methods';
import type { Category } from '../../lib/types/category.type';
import { sortCategories } from '../../lib/utils/categories';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament ?? '');

  return {
    categories: pipe(
      sortCategories,
      map<Category, Pick<Category, 'id' | 'name' | 'currentMatch'>>((category) => ({
        id: category.id,
        name: category.name,
        currentMatch: category.currentMatch
      }))
    )(categories)
  };
};
