import { nanoid } from 'nanoid';

import type { Judoka } from '../types/judoka.type';
import type { Match } from '../types/match.type';

function createMatchJudoka(athlete: Judoka) {
  return {
    id: athlete.id,
    ippon: 0,
    name: athlete.name,
    shido: 0,
    wazari: 0,
    yuko: 0,
  };
}

export function createMatch(white?: Judoka, blue?: Judoka): Match {
  return {
    blue: blue ? createMatchJudoka(blue) : undefined,
    finalTime: null,
    goldenScore: null,
    id: nanoid(),
    white: white ? createMatchJudoka(white) : undefined,
  };
}
