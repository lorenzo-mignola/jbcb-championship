import type { Match } from '../../types/match.type';
import { getOpponentType } from '../../utils/judoka';

export const getRankingBrackets = (matches: Match[]) => {
  const lastMatchIndex = matches.length - 1;
  if (lastMatchIndex < 0) {
    return [];
  }
  const goldFinal = matches[lastMatchIndex];
  const firstBronzeFinal = matches[lastMatchIndex - 1];
  const secondBronzeFinal = matches[lastMatchIndex - 2];

  const ranking = [];

  if (goldFinal.winner) {
    ranking.push({
      rank: 1,
      id: goldFinal[goldFinal.winner]?.id
    });
    ranking.push({
      rank: 2,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
      id: goldFinal[getOpponentType(goldFinal.winner)!]?.id
    });
  }

  if (firstBronzeFinal.winner) {
    ranking.push({
      rank: 3,
      id: firstBronzeFinal[firstBronzeFinal.winner]?.id
    });
    ranking.push({
      rank: 5,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
      id: firstBronzeFinal[getOpponentType(firstBronzeFinal.winner)!]?.id
    });
  }
  if (secondBronzeFinal.winner) {
    ranking.push({
      rank: 3,
      id: secondBronzeFinal[secondBronzeFinal.winner]?.id
    });
    ranking.push({
      rank: 5,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
      id: secondBronzeFinal[getOpponentType(secondBronzeFinal.winner)!]?.id
    });
  }

  return ranking.sort((a, b) => a.rank - b.rank);
};
