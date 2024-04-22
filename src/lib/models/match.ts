import { nanoid } from 'nanoid';

import type { Judoka } from '../types/judoka.type';
import type { Match } from '../types/match.type';

const createMatchJudoka = (athlete: Judoka) => ({
  id: athlete.id,
  name: athlete.name,
  wazari: 0,
  ippon: 0,
  shido: 0
});

export const createMatch = (white?: Judoka, blue?: Judoka): Match => ({
  id: nanoid(),
  white: white ? createMatchJudoka(white) : undefined,
  blue: blue ? createMatchJudoka(blue) : undefined,
  finalTime: null,
  goldenScore: null
});
