import { getCategory, getNotStartedCategory } from '$lib/server/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
  const category = await getCategory(params.category_id);
  const tournament = url.searchParams.get('tournament');
  const notStartedCategories = (await getNotStartedCategory(tournament || '')).filter(
    (categoryNotStarted) => categoryNotStarted.id !== params.category_id
  );
  return {
    category,
    notStartedCategories
  };
};
