import type { Judoka } from '../../../types/Judoka';
import type { MatchJudoka } from '../../../types/Match';

export const resetAthlete = (athlete?: MatchJudoka | Judoka): MatchJudoka | undefined =>
  athlete
    ? {
        ...athlete,
        ippon: 0,
        wazari: 0,
        shido: 0
      }
    : undefined;
