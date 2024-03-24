import { getCategory, getNotStartedCategory } from '$lib/server/methods';
import { equals, filter, map, not, pick, pipe, prop } from 'ramda';
import type { Category } from '../../../../lib/types/category.type';
import { sortCategories } from '../../../../lib/utils/categories';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
  const categoryId = params.category_id;
  const category = await getCategory(categoryId);
  const tournament = url.searchParams.get('tournament');

  const notStartedCategories = await getNotStartedCategory(tournament || '');

  return {
    category,
    notStartedCategories: pipe(
      filter<Category>((categoryNotStarted) =>
        not(equals(prop('id')(categoryNotStarted), categoryId))
      ),
      sortCategories,
      map(pick(['id', 'name']))
    )(notStartedCategories)
  };
};
