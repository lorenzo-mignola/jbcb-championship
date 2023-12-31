import { produce } from 'immer';
import { get } from 'svelte/store';
import { stopOsaekomi } from '../components/osaekomi/$osaekomi-timer';
import type { JudokaType, Match } from '../types/Match';
import { getOpponentType } from '../utils/judoka';
import { match } from './$match';
import { isGoldenScore, stop, timer } from './$timer';
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
      $matchState.goldenScore = get(isGoldenScore);
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
      winner(type);
      return;
    }

    const $isGoldenScore = get(isGoldenScore);
    if ($isGoldenScore && isWinnerByWazari($match, type)) {
      winner(type);
      return;
    }

    if (athlete?.shido === 3) {
      disqualification(type);
      return;
    }
  });

  timer.subscribe(($timer) => {
    if ($timer > 0) {
      return;
    }
    const $match = get(match);
    if (!$match) {
      return;
    }
    if (isWinnerByWazari($match, type)) {
      winner(type);
    }
  });
};
function isWinnerByWazari(match: Match, type: JudokaType) {
  const wazari = match[type]?.wazari || 0;
  const wazariOpponent = match[getOpponentType(type)!]?.wazari || 0;
  return wazari !== wazariOpponent && wazari >= 1;
}
