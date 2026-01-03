import type { JudokaType } from '../types/match.type';

export function getOpponentType(type: JudokaType | null) {
  if (type === 'white') {
    return 'blue';
  }
  if (type === 'blue') {
    return 'white';
  }
  return null;
}
