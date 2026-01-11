import type { Category } from '../../types/category.type';
import type { JudokaType, Match } from '../../types/match.type';

import { persistLocalStore } from '../utils/persist-local-state.svelte';

interface InitializeArguments {
  category?: Pick<Category, 'name' | 'duration'> & { id: string };
  isMedalMatch?: boolean;
  isRepechage: boolean;
  match?: Match;
  nextMatch?: Match;
}

const defaultMatch: Match = {
  blue: undefined,
  finalTime: null,
  goldenScore: null,
  id: '',
  white: undefined,
};

class LocalStorageMatchState {
  #localStorageMatch = persistLocalStore<Match>('jbcb-championship-match', defaultMatch);
  #localStorageCategoryName = persistLocalStore('jbcb-championship-category-name', '');
  #localStorageTime = persistLocalStore('jbcb-championship-time', 0);
  #localStorageOsaekomi = persistLocalStore('jbcb-championship-osaekomi', 0);
  #localStorageGoldenScore = persistLocalStore('jbcb-championship-golden-score', false);
  #localStorageMatchType = persistLocalStore<null | 'medal' | 'repechage'>(
    'jbcb-championship-match-type',
    null,
  );

  #localStorageNextMatch = persistLocalStore<Pick<Match, 'white' | 'blue' | 'id'>>(
    'jbcb-championship-next-match',
    defaultMatch,
  );

  #localStorageOsaekomiType = persistLocalStore<JudokaType | ''>(
    'jbcb-championship-osaekomi-type',
    '',
  );

  #errorMatches = persistLocalStore<Match[]>('jbcb-championship-error', []);

  get localStorageMatch() {
    return this.#localStorageMatch.current;
  }

  get localStorageCategoryName() {
    return this.#localStorageCategoryName.current;
  }

  get localStorageMatchType() {
    return this.#localStorageMatchType.current;
  }

  get localStorageNextMatch() {
    return this.#localStorageNextMatch.current;
  }

  get localStorageTime() {
    return this.#localStorageTime.current;
  }

  get localStorageOsaekomi() {
    return this.#localStorageOsaekomi.current;
  }

  get localStorageGoldenScore() {
    return this.#localStorageGoldenScore.current;
  }

  get localStorageOsaekomiType() {
    return this.#localStorageOsaekomiType.current;
  }

  get errorMatches() {
    return this.#errorMatches.current;
  }

  resetStorageMatch() {
    this.#localStorageMatch.current = defaultMatch;
    this.#localStorageNextMatch.current = defaultMatch;
    this.#localStorageCategoryName.current = '';
    this.#localStorageTime.current = 0;
    this.#localStorageOsaekomi.current = 0;
    this.#localStorageOsaekomiType.current = '';
    this.#localStorageGoldenScore.current = false;
    this.#localStorageMatchType.current = null;
  }

  initialize({ category, isMedalMatch, isRepechage, nextMatch }: InitializeArguments) {
    this.#localStorageMatchType.current = this.#getMatchType(isMedalMatch, isRepechage);
    this.#localStorageCategoryName.current = category?.name || '';
    this.#localStorageNextMatch.current = this.#getMatchInfo(nextMatch);
  }

  #getMatchInfo(nextMatch: Match | undefined) {
    if (!nextMatch) {
      return {
        id: '',
      };
    }

    return {
      blue: nextMatch.blue,
      id: nextMatch.id,
      white: nextMatch.white,
    };
  }

  #getMatchType(isMedalMatch: boolean | undefined, isRepechage: boolean) {
    if (isMedalMatch) {
      return 'medal';
    }
    if (isRepechage) {
      return 'repechage';
    }
    return null;
  }
}

export const localStorageMatchState = new LocalStorageMatchState();
