import { produce } from 'immer';
import { get } from 'svelte/store';
import { stopOsaekomi } from '../../../../../../lib/components/osaekomi/$osaekomi-timer';
import type { JudokaType } from '../../../../../../lib/types/Match';
import { getOpponentType } from '../../../../../../lib/utils/judoka';
import { match } from './$match';
import { stop, timer } from './$timer';
import { getPoints } from './judokaPoints';

const stopTimers = () => {
  stop();
  stopOsaekomi();
};

const winner = (type: JudokaType) => {
  if (!get(match)) {
    return;
  }

  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }
      $matchState.winner = type;
      $matchState.finalTime = get(timer);
    });
  });
  stopTimers();
};

const disqualification = (type: JudokaType) => {
  if (!get(match)) {
    return;
  }

  const opponentType = getOpponentType(type);
  if (!opponentType) {
    return;
  }

  const opponent = get(match)?.[opponentType];
  if (!opponent) {
    return;
  }

  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[opponentType]) {
        return;
      }
      $matchState[opponentType]!.ippon = 1;
      $matchState.winner = opponentType;
      $matchState.finalTime = get(timer);
    });
  });

  stopTimers();
};

export const watchWinnerOrLoser = (type: JudokaType) => {
  match.subscribe(($match) => {
    if (!$match) {
      return;
    }
    if ($match?.winner) {
      return;
    }

    const athlete = $match[type];

    const points = getPoints(athlete);
    if (points === 10) {
      winner('white');
    }
    if (athlete?.shido === 3) {
      disqualification('white');
    }
  });
};
