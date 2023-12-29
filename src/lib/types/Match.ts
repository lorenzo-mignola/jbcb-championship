import type { Judoka } from './Judoka';

export interface Match {
  id: string;
  white?: MatchJudoka;
  blue?: MatchJudoka;
  winner?: JudokaType;
  finalTime: number | null;
  goldenScore: boolean | null;
}

export interface MatchJudoka extends Judoka {
  wazari: number;
  ippon: number;
  shido: number;
}

export type JudokaType = 'white' | 'blue';
