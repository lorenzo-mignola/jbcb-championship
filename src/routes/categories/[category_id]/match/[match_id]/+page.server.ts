import { error } from '@sveltejs/kit';

import type { Category } from '#lib/types/category.type';
import type { Match } from '#lib/types/match.type';

import { getCategory } from '#lib/db';
import { isNotByeMatch } from '#lib/models/ranking/category';

import type { PageServerLoad } from './$types';

interface Output {
  category: Pick<Category, 'name' | 'duration'> & { id: string };
  isMedalMatch: boolean;
  match: Match;
  nextMatch: Match | undefined;
}

export const load: PageServerLoad = async ({ params }): Promise<Output> => {
  const { category_id, match_id } = params;
  const category = await getCategory(category_id);

  if (!category) {
    error(404, 'Categoria non trovata');
  }

  const matchIndex = category.matches.findIndex(
    match => match.id === match_id,
  );

  if (matchIndex === -1) {
    error(404, 'Incontro non trovato');
  }

  const isMedalMatch
    = category.type !== 'pool'
      ? category.matches.length - matchIndex <= 3
      : false;
  const match = category.matches[matchIndex];
  const nextMatch = category.matches.slice(matchIndex + 1).find(isNotByeMatch);

  return {
    category: {
      duration: category.duration,
      id: category.id.toString(),
      name: category.name,
    },
    isMedalMatch,
    match,
    nextMatch,
  };
};
