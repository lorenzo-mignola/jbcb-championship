import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { editCategory, getCategory } from '../../../../lib/server/methods';
import { CategoryBaseSchema } from '../../../../lib/types/category.type';

const schemaPatch = CategoryBaseSchema.pick({
  name: true,
  athletes: true,
  type: true,
  duration: true,
  tournament: true
});

export const PATCH: RequestHandler = async ({ request, params }) => {
  const categoryId = z.string().parse(params.category_id);

  const category = (await request.json()) as unknown;

  const id = await editCategory(categoryId, schemaPatch.parse(category));

  return json(id);
};

// TODO delete
export const GET: RequestHandler = async ({ params }) => {
  const categoryId = z.string().parse(params.category_id);

  const category = await getCategory(categoryId);
  return json(category);
};
