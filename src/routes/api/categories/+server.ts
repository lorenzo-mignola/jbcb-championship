import { json } from '@sveltejs/kit';

import { createCategory } from '../../../lib/server/methods';
import { CategoryBaseSchema } from '../../../lib/types/category.type';
import type { RequestHandler } from './$types';

const schemaCreate = CategoryBaseSchema.pick({
  name: true,
  athletes: true,
  type: true,
  duration: true,
  tournament: true
});

export const POST: RequestHandler = async ({ request }) => {
  const category = (await request.json()) as unknown;

  const id = await createCategory(schemaCreate.parse(category));
  return json(id);
};
