import type { RequestHandler } from '@sveltejs/kit';

import { json } from '@sveltejs/kit';
import { getCategory } from '$lib/db';
import { z } from 'zod';

export const GET: RequestHandler = async ({ params }) => {
  const categoryId = z.string().parse(params.category_id);

  const category = await getCategory(categoryId);

  if (!category) {
    return json([]);
  }

  // keep only not done match
  const nextMatches = category.matches.filter(match => !match.winner);

  return json(nextMatches);
};
