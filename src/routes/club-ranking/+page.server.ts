import { getAllEndedCategories } from '$lib/db';
import { getClubRaking } from '$lib/models/ranking/club-ranking';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllEndedCategories(tournament ?? '');

  const ranking = getClubRaking(categories);

  return {
    ranking,
  };
};
