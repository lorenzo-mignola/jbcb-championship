import { PUBLIC_AUTO_PRINT } from '$env/static/public';
import { getCategory } from '$lib/server/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { category_id } = params;
  const category = await getCategory(category_id);

  return {
    category,
    autoPrint: PUBLIC_AUTO_PRINT !== 'false'
  };
};
