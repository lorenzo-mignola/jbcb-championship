import type { RequestHandler } from '@sveltejs/kit';

import { json } from '@sveltejs/kit';
import { z } from 'zod';

import { editCategory } from '$lib/db';
import { CategoryBaseSchema } from '$lib/types/category.type';

const schemaPatch = CategoryBaseSchema.pick({
  athletes: true,
  duration: true,
  name: true,
  tournament: true,
  type: true,
});

export const PATCH: RequestHandler = async ({ params, request }) => {
  const categoryId = z.string().parse(params.category_id);

  const category = (await request.json()) as unknown;

  const id = await editCategory(categoryId, schemaPatch.parse(category));

  return json(id);
};
