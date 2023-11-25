import { getCategory } from '../../../../lib/db/methods';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const category = getCategory(params.id);
  return {
    category
  };
};
