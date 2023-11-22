export interface Round {
  id: string;
  white: RoundJudoka;
  blue: RoundJudoka;
  finalTime: number;
}

interface RoundJudoka {
  id: string;
  name: string;
  wazari: number;
  ippon: number;
  shido: number;
}
