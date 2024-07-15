import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

import { editCategory } from '../../../lib/server/edit-category';
import { getCategory } from '../../../lib/server/get-category';
import type { Category } from '../../../lib/types/category.type';
import { type Judoka } from '../../../lib/types/judoka.type';

const pathAthleteSchema = z.object({
  originalCategory: z.string(),
  newCategory: z.string(),
  athlete: z.string()
});

const updateNewCategory = (athlete: Judoka) => async (newCategoryId: string) => {
  const newCategory = await getCategory(newCategoryId);

  if (!newCategory) {
    return;
  }

  const { name, athletes, type, duration, tournament } = newCategory;
  const athletesUpdated = [...athletes, athlete];

  return editCategory(newCategoryId, {
    name,
    athletes: athletesUpdated,
    type,
    duration,
    tournament
  });
};

const updateOriginalCategory = (athleteId: string) => async (originalCategory: Category) => {
  const { name, athletes, type, duration, tournament, id } = originalCategory;
  const athletesFiltered = athletes.filter((athlete) => athlete.id !== athleteId);

  return editCategory(id, {
    name,
    athletes: athletesFiltered,
    type,
    duration,
    tournament
  });
};

export const PATCH: RequestHandler = async ({ request }) => {
  const requestData = (await request.json()) as unknown;
  const {
    originalCategory: originalCategoryId,
    newCategory: newCategoryId,
    athlete: athleteId
  } = pathAthleteSchema.parse(requestData);

  const originalCategory = await getCategory(originalCategoryId);

  if (!originalCategory) {
    error(500, 'Original category not found');
  }

  const athleteToUpdate = originalCategory.athletes.find((athlete) => athlete.id === athleteId);

  if (!athleteToUpdate) {
    error(500, 'Athlete not found');
  }

  const originalCategoryIdUpdated = await updateOriginalCategory(athleteToUpdate.id)(
    originalCategory
  );

  const newCategoryIdUpdated = await updateNewCategory(athleteToUpdate)(newCategoryId);

  if (!originalCategoryIdUpdated) {
    error(500, 'Original category not found');
  }

  return json({
    originalCategoryId: originalCategoryIdUpdated,
    newCategoryId: newCategoryIdUpdated
  });
};
