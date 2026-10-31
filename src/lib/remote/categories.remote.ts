import { command, query } from '$app/server';
import { z } from 'zod';

import { createCategory, editCategory, getCategory, saveMatch } from '#lib/db';
import { CategoryBaseSchema } from '#lib/types/category.type';
import { MatchSchema } from '#lib/types/match.type';

const CategoryInputSchema = CategoryBaseSchema.pick({
  athletes: true,
  duration: true,
  name: true,
  tournament: true,
  type: true,
});

const EditCategoryInputSchema = z.object({
  category: CategoryInputSchema,
  categoryId: z.string(),
});

const SaveMatchInputSchema = z.object({
  categoryId: z.string(),
  match: MatchSchema,
});

export const createCategoryCommand = command(
  CategoryInputSchema,
  async (category) => {
    return await createCategory(category);
  },
);

export const editCategoryCommand = command(
  EditCategoryInputSchema,
  async ({ category, categoryId }) => {
    return await editCategory(categoryId, category);
  },
);

export const saveMatchCommand = command(
  SaveMatchInputSchema,
  async ({ categoryId, match }) => {
    return await saveMatch(categoryId, match);
  },
);

export const getNextMatchesQuery = query(
  z.string(),
  async (categoryId) => {
    const category = await getCategory(categoryId);
    if (!category) {
      return [];
    }
    return category.matches.filter(match => !match.winner);
  },
);
