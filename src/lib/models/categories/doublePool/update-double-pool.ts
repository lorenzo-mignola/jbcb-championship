import { produce } from 'immer';
import type { DoublePoolCategory } from '../../../types/category.type';
import type { Match } from '../../../types/match.type';
import { getRankingPool } from '../../ranking/category';
import { resetAthlete } from '../brackets/reset-athlete';

const isPoolMatch = (category: DoublePoolCategory, matchId: string) => {
  const { A, B } = category.pools;
  return A.some((match) => match.id === matchId) || B.some((match) => match.id === matchId);
};

const isPoolAorB = (category: DoublePoolCategory, matchId: string) => {
  const { A, B } = category.pools;
  if (A.some((match) => match.id === matchId)) {
    return 'A';
  }
  if (B.some((match) => match.id === matchId)) {
    return 'B';
  }
  throw new Error('No pool found');
};

const isSemiFinalMatch = (category: DoublePoolCategory, matchId: string) => {
  const { semifinals } = category;
  return semifinals.some((match) => match.id === matchId);
};

const isFinalMatch = (category: DoublePoolCategory, matchId: string) => {
  const { finalMatch } = category;
  return finalMatch.id === matchId;
};

const getWhiteAndBlueSemifinal = (category: DoublePoolCategory, index: 0 | 1) => {
  const winnerPool = category.pools[index === 0 ? 'A' : 'B'];
  const winnerPoolAthletes = category.pools[index === 0 ? 'aAthletes' : 'bAthletes'];
  const loserPool = category.pools[index === 0 ? 'B' : 'A'];
  const loserPoolAthletes = category.pools[index === 0 ? 'bAthletes' : 'aAthletes'];
  const whiteId = getRankingPool(winnerPool, winnerPoolAthletes).find((rank) => rank.rank === 1)
    ?.id;
  const blueId = getRankingPool(loserPool, loserPoolAthletes).find((rank) => rank.rank === 2)?.id;
  return {
    white: resetAthlete(category.athletes.find((athlete) => athlete.id === whiteId)),
    blue: resetAthlete(category.athletes.find((athlete) => athlete.id === blueId))
  };
};

const updateSemifinals = (category: DoublePoolCategory): DoublePoolCategory['semifinals'] => {
  const { semifinals } = category;

  return semifinals.map((match, index) => {
    return {
      ...match,
      ...getWhiteAndBlueSemifinal(category, index as 0 | 1)
    };
  }) as [Match, Match];
};

function updatePoolMatch(category: DoublePoolCategory, matchUpdated: Match) {
  const currentMatch = category.matches.findIndex((match) => match.id === matchUpdated.id);
  const nextMatch = category.matches[currentMatch + 1].id;
  const isNextMatchSemifinal = isSemiFinalMatch(category, nextMatch);
  const poolUpdated = produce(category.pools, (pools) => {
    pools[isPoolAorB(category, matchUpdated.id)] = pools[isPoolAorB(category, matchUpdated.id)].map(
      (match) => {
        if (match.id === matchUpdated.id) {
          return matchUpdated;
        }
        return match;
      }
    );
  });
  const categoryUpdated: DoublePoolCategory = {
    ...category,
    currentMatch: nextMatch,
    pools: poolUpdated,
    matches: category.matches.map((match) => {
      if (match.id === matchUpdated.id) {
        return matchUpdated;
      }
      return match;
    })
  };

  if (isNextMatchSemifinal) {
    categoryUpdated.semifinals = updateSemifinals(category);
    const firstSemifinalMatchIndex = categoryUpdated.matches.length - 3;
    const secondSemifinalMatchIndex = categoryUpdated.matches.length - 2;
    categoryUpdated.matches = categoryUpdated.matches.map((match, index) => {
      if (index === firstSemifinalMatchIndex) {
        return {
          ...match,
          ...getWhiteAndBlueSemifinal(categoryUpdated, 0)
        };
      }
      if (index === secondSemifinalMatchIndex) {
        return {
          ...match,
          ...getWhiteAndBlueSemifinal(categoryUpdated, 1)
        };
      }
      return match;
    });
  }
  return categoryUpdated;
}

function updateSemiFinalMatch(category: DoublePoolCategory, matchUpdated: Match) {
  const currentMatch = category.matches.findIndex((match) => match.id === matchUpdated.id);
  const categoryUpdated: DoublePoolCategory = {
    ...category,
    currentMatch: category.matches[currentMatch + 1].id,
    semifinals: category.semifinals.map((match) => {
      if (match.id !== matchUpdated.id) {
        return match;
      }
      return matchUpdated;
    }) as [Match, Match],
    matches: category.matches.map((match) => {
      if (match.id !== matchUpdated.id) {
        return match;
      }
      return matchUpdated;
    })
  };

  const isLastSemifinal = currentMatch === category.matches.length - 2;
  if (isLastSemifinal) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- winner is setted
    const winnerFirstSemi = categoryUpdated.semifinals[0][categoryUpdated.semifinals[0].winner!];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- winner is setted
    const winnerSecondSemi = categoryUpdated.semifinals[1][categoryUpdated.semifinals[1].winner!];
    categoryUpdated.finalMatch.white = resetAthlete(winnerFirstSemi);
    categoryUpdated.finalMatch.blue = resetAthlete(winnerSecondSemi);
    categoryUpdated.matches = categoryUpdated.matches.map((match) => {
      if (match.id !== categoryUpdated.finalMatch.id) {
        return match;
      }
      return categoryUpdated.finalMatch;
    });
  }
  return categoryUpdated;
}

function updateFinalMatch(category: DoublePoolCategory, matchUpdated: Match) {
  const categoryUpdated: DoublePoolCategory = {
    ...category,
    currentMatch: null,
    finalMatch: matchUpdated,
    matches: category.matches.map((match) => {
      if (match.id !== matchUpdated.id) {
        return match;
      }
      return matchUpdated;
    })
  };

  return categoryUpdated;
}

export const updateDoublePool = (
  category: DoublePoolCategory,
  matchUpdated: Match
): DoublePoolCategory => {
  if (isPoolMatch(category, matchUpdated.id)) {
    return updatePoolMatch(category, matchUpdated);
  }

  if (isSemiFinalMatch(category, matchUpdated.id)) {
    return updateSemiFinalMatch(category, matchUpdated);
  }

  if (isFinalMatch(category, matchUpdated.id)) {
    return updateFinalMatch(category, matchUpdated);
  }

  return category;
};
