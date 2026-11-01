import { error } from '@sveltejs/kit';

import { getCategory } from '#lib/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const category = await getCategory(params.category_id);
  if (!category) {
    error(404, 'Categoria non trovata');
  }

  return {
    category,
  };
};
