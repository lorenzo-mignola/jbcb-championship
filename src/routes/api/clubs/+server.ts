import { json, type RequestHandler } from '@sveltejs/kit';
import { categoriesCollection } from '../../../lib/server/firebase';

// TODO delete
export const GET: RequestHandler = async ({ url }) => {
  const tournament = url.searchParams.get('tournament');

  const categories = await categoriesCollection.where('tournament', '==', tournament).get();
  if (categories.empty) {
    return json([]);
  }
  const athletes = categories.docs.flatMap((category) => category.data().athletes);
  const clubs = new Set(
    athletes.map((athlete) => athlete.club).filter((club): club is string => Boolean(club))
  );
  return json(Array.from(clubs));
};
