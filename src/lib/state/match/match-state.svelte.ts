import type { JudokaType, Match } from '../../types/match.type';

class MatchState {
  match = $state<Match | undefined>(undefined);

  #getJudokaByType(type: JudokaType) {
    return this.match?.[type];
  }

  ippon(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.ippon += 1;
  }

  wazari(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.wazari += 1;
  }

  shido(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.shido += 1;
  }
}

export const matchState = new MatchState();
