import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { saveMatch } from '../../../../../lib/server/methods';
import { MatchSchema } from '../../../../../lib/types/match.type';

export const PATCH: RequestHandler = async ({ request, params }) => {
  const categoryId = z.string().parse(params.category_id);

  const match = (await request.json()) as unknown;

  const category = await saveMatch(categoryId, MatchSchema.parse(match));

  return json(category);
};
