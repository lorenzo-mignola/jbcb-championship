import type { DoublePoolCategory } from '$lib/types/category.type';
import type { Rounds } from '$lib/types/rounds.type';

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
