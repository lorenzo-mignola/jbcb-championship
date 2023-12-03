import type { MatchJudoka } from '../../../../../../lib/types/Match';

export const getPoints = (judoka: MatchJudoka) => {
  if (judoka.ippon) {
    return judoka.ippon;
  }
  if (judoka.wazari === 2) {
    return 10;
  }
  return judoka.wazari;
};

export const setIppon = (judoka: MatchJudoka) => {
  judoka.ippon = 10;
};

export const setWazari = (judoka: MatchJudoka) => {
  judoka.wazari += 1;
};

export const setShido = (judoka: MatchJudoka) => {
  judoka.shido += 1;
};
