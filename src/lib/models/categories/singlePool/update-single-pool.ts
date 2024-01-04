import type { Category } from '../../../types/category.type';
import type { Match } from '../../../types/match.type';

export function updateSinglePool(category: Category, matchUpdated: Match) {
  const nextMatch = category.matches.findIndex((match) => match.id === matchUpdated.id);
  const done = nextMatch === category.matches.length - 1;
  const categoryUpdated: Category = {
    ...category,
    currentMatch: done ? undefined : category.matches[nextMatch + 1].id,
    matches: category.matches.map((match) => {
      if (match.id !== matchUpdated.id) {
        return match;
      }
      return matchUpdated;
    })
  };
  return categoryUpdated;
}
