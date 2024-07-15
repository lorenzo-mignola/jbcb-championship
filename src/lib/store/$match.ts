import { produce } from 'immer';
import { writable } from 'svelte/store';

import type { JudokaType, Match } from '../types/match.type';

export const match = writable<Match | undefined>(undefined);

export const ippon = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].ippon += 1;
    });
  });
};

export const removeIppon = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].ippon -= 1;
      if ($matchState.winner) {
        $matchState.winner = undefined;
      }
    });
  });
};

export const wazari = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].wazari += 1;
    });
  });
};

export const removeWazari = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].wazari -= 1;
      if ($matchState.winner) {
        $matchState.winner = undefined;
      }
    });
  });
};

export const shido = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].shido += 1;
    });
  });
};

export const removeShido = (type: JudokaType) => {
  match.update(($match) => {
    return produce($match, ($matchState) => {
      if (!$matchState?.[type]) {
        return;
      }

      $matchState[type].shido -= 1;
    });
  });
};
