import { json } from '@sveltejs/kit';

import { createCategory } from '$lib/db';
import { CategoryBaseSchema } from '$lib/types/category.type';

import type { RequestHandler } from './$types';

const schemaCreate = CategoryBaseSchema.pick({
  athletes: true,
  duration: true,
  name: true,
  tournament: true,
  type: true,
});

export const POST: RequestHandler = async ({ request }) => {
  const category = (await request.json()) as unknown;

  const id = await createCategory(schemaCreate.parse(category));
  return json(id);
};
