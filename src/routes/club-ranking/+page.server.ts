import { getClubRaking } from '../../lib/models/ranking/club-ranking';
import { getAllEndedCategories } from '../../lib/server/methods';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');
  const categories = await getAllEndedCategories(tournament || '');

  const ranking = getClubRaking(categories);

  return {
    ranking
  };
};
