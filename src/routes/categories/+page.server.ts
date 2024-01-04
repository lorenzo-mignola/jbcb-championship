import { getAllCategories } from '../../lib/db/methods.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const categories = await getAllCategories();
  return {
    categories
  };
};
