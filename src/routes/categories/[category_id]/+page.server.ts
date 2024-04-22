import { getCategory } from '$lib/server/methods';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const category = await getCategory(params.category_id);
  return {
    category
  };
};
