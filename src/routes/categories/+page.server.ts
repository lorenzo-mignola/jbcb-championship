import { map, pipe } from 'ramda';

import type { Category } from '$lib/types/category.type';

import { getAllCategories } from '$lib/db';
import { sortCategories } from '$lib/utils/categories-utils';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament ?? '');

  return {
    categories: pipe(
      sortCategories,
      map<Category, Pick<Category, 'id' | 'name' | 'currentMatch'>>(
        category => ({
          currentMatch: category.currentMatch,
          id: category.id,
          name: category.name,
        }),
      ),
    )(categories),
  };
};
