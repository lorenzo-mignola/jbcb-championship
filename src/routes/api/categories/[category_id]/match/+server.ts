import type { RequestHandler } from '@sveltejs/kit';

import { json } from '@sveltejs/kit';
import { saveMatch } from '$lib/db';
import { MatchSchema } from '$lib/types/match.type';
import { z } from 'zod';

export const PATCH: RequestHandler = async ({ params, request }) => {
  const categoryId = z.string().parse(params.category_id);

  const match = (await request.json()) as unknown;

  const category = await saveMatch(categoryId, MatchSchema.parse(match));

  return json(category);
};
