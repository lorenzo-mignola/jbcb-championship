import type { DoublePoolCategory, Rounds } from '../../../types/Category';

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
