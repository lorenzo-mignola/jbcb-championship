import type { Judoka } from '../../../types/judoka.type';
import type { MatchJudoka } from '../../../types/match.type';

export function resetAthlete(
  athlete?: MatchJudoka | Judoka,
): MatchJudoka | undefined {
  return athlete
    ? {
      ...athlete,
      ippon: 0,
      shido: 0,
      wazari: 0,
    }
    : undefined;
}
