import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { editCategory } from '../../../../lib/db/methods';
import { CategoryBaseSchema } from '../../../../lib/types/category.type';

const schemaPatch = CategoryBaseSchema.pick({
  name: true,
  athletes: true,
  type: true,
  duration: true
});

export const PATCH: RequestHandler = async ({ request, params }) => {
  const categoryId = z.string().parse(params.category_id);

  const category = (await request.json()) as unknown;

  const id = await editCategory(categoryId, schemaPatch.parse(category));

  return json(id);
};
