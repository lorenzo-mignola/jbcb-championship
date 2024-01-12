import type { Judoka } from '../../../types/judoka.type';
import type { MatchJudoka } from '../../../types/match.type';

export const resetAthlete = (athlete?: MatchJudoka | Judoka): MatchJudoka | undefined =>
  athlete
    ? {
        ...athlete,
        ippon: 0,
        wazari: 0,
        shido: 0
      }
    : undefined;
