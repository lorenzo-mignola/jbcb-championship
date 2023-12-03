export interface Match {
  id: string;
  white: MatchJudoka;
  blue: MatchJudoka;
  winner: JudokaType;
  finalTime: number | null;
}

export interface MatchJudoka {
  id: string;
  name: string;
  wazari: number;
  ippon: number;
  shido: number;
}

export type JudokaType = 'white' | 'blue';
