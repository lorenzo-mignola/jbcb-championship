import type { Match } from '../../../types/match.type';

export const getCurrentMatch = (matches: Match[], currentMatchId: string) => {
  const currentIndex = matches.findIndex((match) => match.id === currentMatchId);
  if (currentIndex === -1 || currentIndex === matches.length - 1) {
    return null;
  }
  return matches[currentIndex + 1].id;
};
