import { prop, sortBy } from 'ramda';
import { getAllCategories } from '../../lib/server/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament || '');
  const categoriesMapped = categories.map((category) => ({
    id: category.id,
    name: category.name,
    currentMatch: category.currentMatch
  }));
  return {
    categories: sortBy<(typeof categoriesMapped)[number]>(prop('name'))(categoriesMapped)
  };
};
