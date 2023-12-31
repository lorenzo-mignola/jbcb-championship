import { PUBLIC_AUTO_PRINT } from '$env/static/public';
import { getCategory } from '$lib/db/methods';
import type { PageLoad } from './[category_id]/$types';

export const load: PageLoad = async ({ params }) => {
  const { category_id } = params;
  const category = getCategory(category_id);

  return {
    category,
    autoPrint: PUBLIC_AUTO_PRINT !== 'false'
  };
};
