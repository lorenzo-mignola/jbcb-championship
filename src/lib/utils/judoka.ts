import type { JudokaType } from '../types/Match';

export const getOpponentType = (type: JudokaType | null) => {
  if (type === 'white') {
    return 'blue';
  }
  if (type === 'blue') {
    return 'white';
  }
  return null;
};
