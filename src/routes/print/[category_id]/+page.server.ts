import { AUTO_PRINT } from '$env/static/private';
import { getCategory } from '../../../lib/db/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { category_id } = params;
  const category = getCategory(category_id);

  return {
    category,
    autoPrint: AUTO_PRINT !== 'false'
  };
};
