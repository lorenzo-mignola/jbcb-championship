import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { editCategory } from '../../../lib/server/edit-category';
import { getCategory } from '../../../lib/server/get-category';
import { JudokaSchema, type Judoka } from '../../../lib/types/judoka.type';

const pathAthleteSchema = z.object({
  originalCategory: z.string(),
  newCategory: z.string(),
  athlete: JudokaSchema
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

const updateOriginalCategory = (athleteId: string) => async (originalCategoryId: string) => {
  const originalCategory = await getCategory(originalCategoryId);

  if (!originalCategory) {
    return;
  }

  const { name, athletes, type, duration, tournament } = originalCategory;
  const athletesFiltered = athletes.filter((athlete) => athlete.id !== athleteId);

  return editCategory(originalCategoryId, {
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
    athlete
  } = pathAthleteSchema.parse(requestData);

  const originalCategoryIdUpdated = await updateOriginalCategory(athlete.id)(originalCategoryId);

  if (!originalCategoryId) {
    error(500, 'Original category not found');
  }

  const newCategoryIdUpdated = await updateNewCategory(athlete)(newCategoryId);

  if (!originalCategoryIdUpdated) {
    error(500, 'Original category not found');
  }

  return json({
    originalCategoryId: originalCategoryIdUpdated,
    newCategoryId: newCategoryIdUpdated
  });
};
