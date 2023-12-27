import { produce } from 'immer';
import { get, writable } from 'svelte/store';
import type { JudokaType, Match } from '../../../../../lib/types/Match';
import { getOpponentType } from '../../../../../lib/utils/judoka';
import { isPlaying, timer, togglePlay } from './$timer';

export const match = writable<Match | undefined>();

export const ippon = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.ippon += 1;
    });
  });
};

export const removeIppon = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.ippon -= 1;
      if (state.winner) {
        state.winner = undefined;
      }
    });
  });
};

export const wazari = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.wazari += 1;
    });
  });
};

export const removeWazari = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.wazari -= 1;
      if (state.winner) {
        state.winner = undefined;
      }
    });
  });
};

export const shido = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.shido += 1;
    });
  });
};

export const removeShido = (type: JudokaType) => {
  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state[type]!.shido -= 1;
    });
  });
};

export const winner = (type: JudokaType) => {
  if (!get(match)) {
    return;
  }

  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[type]) {
        return;
      }
      state.winner = type;
      state.finalTime = get(timer);
    });
  });
  if (get(isPlaying)) {
    togglePlay();
  }
};

export const disqualification = (type: JudokaType) => {
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

  match.update((state) => {
    return produce(state, (state) => {
      if (!state?.[opponentType]) {
        return;
      }
      state[opponentType]!.ippon = 1;
      state.winner = opponentType;
      state.finalTime = get(timer);
    });
  });

  if (get(isPlaying)) {
    togglePlay();
  }
};
