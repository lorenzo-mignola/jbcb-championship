import type { JudokaType } from '../types/match.type';

export const getOpponentType = (type: JudokaType | null) => {
  if (type === 'white') {
    return 'blue';
  }
  if (type === 'blue') {
    return 'white';
  }
  return null;
};
