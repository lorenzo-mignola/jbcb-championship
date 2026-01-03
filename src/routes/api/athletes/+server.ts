import type { RequestHandler } from '@sveltejs/kit';

import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

import type { Category } from '$lib/types/category.type';
import type { Judoka } from '$lib/types/judoka.type';

import { editCategory, getCategory } from '$lib/db';

const pathAthleteSchema = z.object({
  athlete: z.string(),
  newCategory: z.string(),
  originalCategory: z.string(),
});

function updateNewCategory(athlete: Judoka) {
  return async (newCategoryId: string) => {
    const newCategory = await getCategory(newCategoryId);

    if (!newCategory) {
      return;
    }

    const { athletes, duration, name, tournament, type } = newCategory;
    const athletesUpdated = [...athletes, athlete];

    return editCategory(newCategoryId, {
      athletes: athletesUpdated,
      duration,
      name,
      tournament,
      type,
    });
  };
}

function updateOriginalCategory(athleteId: string) {
  return async (originalCategory: Category) => {
    const { athletes, duration, id, name, tournament, type } = originalCategory;
    const athletesFiltered = athletes.filter(
      athlete => athlete.id !== athleteId,
    );

    return editCategory(id, {
      athletes: athletesFiltered,
      duration,
      name,
      tournament,
      type,
    });
  };
}

export const PATCH: RequestHandler = async ({ request }) => {
  const requestData = (await request.json()) as unknown;
  const {
    athlete: athleteId,
    newCategory: newCategoryId,
    originalCategory: originalCategoryId,
  } = pathAthleteSchema.parse(requestData);

  const originalCategory = await getCategory(originalCategoryId);

  if (!originalCategory) {
    error(500, 'Original category not found');
  }

  const athleteToUpdate = originalCategory.athletes.find(
    athlete => athlete.id === athleteId,
  );

  if (!athleteToUpdate) {
    error(500, 'Athlete not found');
  }

  const originalCategoryIdUpdated = await updateOriginalCategory(
    athleteToUpdate.id,
  )(originalCategory);

  const newCategoryIdUpdated
    = await updateNewCategory(athleteToUpdate)(newCategoryId);

  if (!originalCategoryIdUpdated) {
    error(500, 'Original category not found');
  }

  return json({
    newCategoryId: newCategoryIdUpdated,
    originalCategoryId: originalCategoryIdUpdated,
  });
};
