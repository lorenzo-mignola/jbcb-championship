import { produce } from 'immer';
import { get } from 'svelte/store';
import { isExtraTime, stopOsaekomi } from '../components/osaekomi/$osaekomi-timer';
import type { JudokaType, Match } from '../types/match.type';
import { getOpponentType } from '../utils/judoka';
import { localStorageMatch, resetStorageMatch } from './$local-storage-match';
import { match } from './$match';
import { isGoldenScore, reset, stop, timer } from './$timer';
import { getPoints } from './judoka-points';

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
      $matchState[opponentType]!.ippon = 1;
      $matchState.winner = opponentType;
      $matchState.finalTime = get(timer);
    });
  });

  stopTimers();
};

export const watchWinnerOrLoser = (type: JudokaType) => {
  const matchUnsubscribe = match.subscribe(($match) => {
    if (!$match) {
      return;
    }
    if ($match.winner) {
      return;
    }

    const athlete = $match[type];

    const points = getPoints(athlete);
    if (points === 10) {
      winner(type);
      return;
    }

    const $isGoldenScore = get(isGoldenScore);
    const $isExtraTime = get(isExtraTime);
    const isOverTimer = $isExtraTime || $isGoldenScore;
    if (isOverTimer && isWinnerByWazari($match, type)) {
      winner(type);
      reset();
      return;
    }

    if (athlete?.shido === 3) {
      disqualification(type);
    }
  });

  const timerUnsubscribe = timer.subscribe(($timer) => {
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

  const unsubscribeMatchStorage = match.subscribe(($match) => {
    $match ? localStorageMatch.set($match) : resetStorageMatch();
  });

  return () => {
    timerUnsubscribe();
    matchUnsubscribe();
    unsubscribeMatchStorage();
  };
};
function isWinnerByWazari(matchUpdated: Match, type: JudokaType) {
  const wazari = matchUpdated[type]?.wazari || 0;
  const opponentType = getOpponentType(type);
  if (!opponentType) {
    return false;
  }
  const wazariOpponent = matchUpdated[opponentType]?.wazari || 0;
  return wazari !== wazariOpponent && wazari >= 1;
}
