import { getAllCategories } from '../../lib/db/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament || '');
  return {
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
      currentMatch: category.currentMatch
    }))
  };
};
