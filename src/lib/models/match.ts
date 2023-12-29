import { nanoid } from 'nanoid';
import type { Judoka } from '../types/Judoka';
import type { Match } from '../types/Match';

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
