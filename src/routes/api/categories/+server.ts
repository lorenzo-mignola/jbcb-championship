import { json } from '@sveltejs/kit';
import { createCategory } from '../../../lib/db/methods.server';
import { CategoryBaseSchema } from '../../../lib/types/category.type';
import type { RequestHandler } from './$types';

const schema = CategoryBaseSchema.pick({
  name: true,
  athletes: true,
  type: true,
  duration: true
});

export const POST: RequestHandler = async ({ request }) => {
  const category = (await request.json()) as unknown;

  const id = await createCategory(schema.parse(category));
  return json(id.toString());
};
