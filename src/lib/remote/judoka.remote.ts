import { error } from '@sveltejs/kit';
import { command } from '$app/server';
import { z } from 'zod';

import type { Category } from '#lib/types/category.type';

import { categoriesCollection } from '#lib/db/categories-collection';
import { generateCategory } from '#lib/db/create-cateogry';
import { db } from '#lib/db/firebase';
import { isNotByeMatch } from '#lib/models/ranking/category';

const MoveJudokaInputSchema = z.object({
  judokaId: z.string(),
  newCategoryId: z.string(),
  originalCategoryId: z.string(),
});

async function getCategoryWithId(
  transaction: FirebaseFirestore.Transaction,
  categoryRef: FirebaseFirestore.DocumentReference,
) {
  const categorySnapshot = await transaction.get(categoryRef);

  if (!categorySnapshot.exists) {
    error(404, 'Category not found');
  }

  const categoryData = categorySnapshot.data();
  const category = {
    id: categorySnapshot.id,
    ...categoryData,
  } as Category;

  const origHasStarted = category.matches
    .filter(isNotByeMatch)
    .some(match => Boolean(match.winner));

  if (origHasStarted) {
    error(400, 'Cannot move judoka from a category with completed matches');
  }

  return category;
}

export const moveJudokaCommand = command(
  MoveJudokaInputSchema,
  async ({ judokaId, newCategoryId, originalCategoryId }) => {
    if (originalCategoryId === newCategoryId) {
      error(400, 'Original and new categories cannot be the same');
    }

    const originalCategoryRef = categoriesCollection.doc(originalCategoryId);
    const newCategoryRef = categoriesCollection.doc(newCategoryId);

    await db.runTransaction(async (transaction) => {
      const [originalCategory, targetCategory] = await Promise.all([
        getCategoryWithId(transaction, originalCategoryRef),
        getCategoryWithId(transaction, newCategoryRef),
      ]);

      const judokaToMove = originalCategory.athletes.find(j => j.id === judokaId);
      if (!judokaToMove) {
        error(404, 'Judoka not found in original category');
      }

      const origAthletes = originalCategory.athletes.filter(j => j.id !== judokaId);
      const targetAthletes = [...targetCategory.athletes, judokaToMove];

      const regeneratedOrig = generateCategory({
        athletes: origAthletes,
        duration: originalCategory.duration,
        name: originalCategory.name,
        tournament: originalCategory.tournament,
        type: originalCategory.type,
      });

      const regeneratedTarget = generateCategory({
        athletes: targetAthletes,
        duration: targetCategory.duration,
        name: targetCategory.name,
        tournament: targetCategory.tournament,
        type: targetCategory.type,
      });

      transaction.set(originalCategoryRef, regeneratedOrig);
      transaction.set(newCategoryRef, regeneratedTarget);
    });

    return {
      newCategoryId,
      originalCategoryId,
    };
  },
);
