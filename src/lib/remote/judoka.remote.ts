import { error } from '@sveltejs/kit';
import { command } from '$app/server';
import { z } from 'zod';

import { editCategory, getCategory } from '#lib/db';

const MoveJudokaInputSchema = z.object({
  judokaId: z.string(),
  newCategoryId: z.string(),
  originalCategoryId: z.string(),
});

export const moveJudokaCommand = command(
  MoveJudokaInputSchema,
  async ({ judokaId, newCategoryId, originalCategoryId }) => {
    const [originalCategory, newCategory] = await Promise.all([
      getCategory(originalCategoryId),
      getCategory(newCategoryId),
    ]);

    if (!originalCategory) {
      error(404, 'Original category not found');
    }

    if (!newCategory) {
      error(404, 'New category not found');
    }

    const judokaToMove = originalCategory.athletes.find(
      judoka => judoka.id === judokaId,
    );

    if (!judokaToMove) {
      error(404, 'Judoka not found in original category');
    }

    // Filter out judoka from original category
    const originalAthletesFiltered = originalCategory.athletes.filter(
      judoka => judoka.id !== judokaId,
    );

    // Append judoka to new category
    const newAthletesUpdated = [...newCategory.athletes, judokaToMove];

    const [originalCategoryIdUpdated, newCategoryIdUpdated] = await Promise.all([
      editCategory(originalCategory.id, {
        athletes: originalAthletesFiltered,
        duration: originalCategory.duration,
        name: originalCategory.name,
        tournament: originalCategory.tournament,
        type: originalCategory.type,
      }),
      editCategory(newCategory.id, {
        athletes: newAthletesUpdated,
        duration: newCategory.duration,
        name: newCategory.name,
        tournament: newCategory.tournament,
        type: newCategory.type,
      }),
    ]);

    return {
      newCategoryId: newCategoryIdUpdated,
      originalCategoryId: originalCategoryIdUpdated,
    };
  },
);
