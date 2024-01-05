import { getAllCategories } from '../lib/db/methods';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const c = await getAllCategories();
  return {
    c
  };
};
