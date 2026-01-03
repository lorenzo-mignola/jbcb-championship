import type { DoublePoolCategory } from '$lib/types/category.type';
import type { Rounds } from '$lib/types/rounds.type';

export function mapFinalsToRounds(category: DoublePoolCategory): Rounds {
  const firstRound = {
    loser: [],
    repechage: [],
    winner: category.semifinals,
  };
  const secondRound = {
    loser: [],
    repechage: [],
    winner: [category.finalMatch],
  };
  return [firstRound, secondRound];
}
