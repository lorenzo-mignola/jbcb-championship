import { PUBLIC_AUTO_PRINT } from '$env/static/public';
import { getAllCategories } from '$lib/server/methods';
import { pick } from 'ramda';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllCategories(tournament || '');

  return {
    categories: categories.map(pick(['name', 'athletes', 'id', 'duration', 'type'])),
    autoPrint: PUBLIC_AUTO_PRINT !== 'false'
  };
};
