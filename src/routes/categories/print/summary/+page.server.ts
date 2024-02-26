import { PUBLIC_AUTO_PRINT } from '$env/static/public';
import { getAllCategories } from '$lib/server/methods';
import { sortCategories } from '$lib/utils/categories';
import { pipe } from 'ramda';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament || '');

  return {
    categories: pipe(sortCategories)(categories),
    autoPrint: PUBLIC_AUTO_PRINT !== 'false'
  };
};
