import { getCategory } from '$lib/db/methods';
import type { PageLoad } from './$types';
import { PUBLIC_AUTO_PRINT } from '$env/static/public';

export const load: PageLoad = ({ params }) => {
  const { category_id } = params;
  const category = getCategory(category_id);

  return {
    category,
    autoPrint: PUBLIC_AUTO_PRINT !== 'false'
  };
};
