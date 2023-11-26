export interface Match {
  id: string;
  white: MatchJudoka;
  blue: MatchJudoka;
  finalTime: number | null;
}

export interface MatchJudoka {
  id: string;
  name: string;
  wazari: number;
  ippon: number;
  shido: number;
}
