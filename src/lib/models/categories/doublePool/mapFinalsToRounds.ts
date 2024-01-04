import type { DoublePoolCategory } from '$lib/types/Category';
import type { Rounds } from '$lib/types/Rounds';

export const mapFinalsToRounds = (category: DoublePoolCategory): Rounds => {
  const firstRound = {
    winner: category.semifinals,
    loser: [],
    repechage: []
  };
  const secondRound = {
    winner: [category.finalMatch],
    loser: [],
    repechage: []
  };
  return [firstRound, secondRound];
};
