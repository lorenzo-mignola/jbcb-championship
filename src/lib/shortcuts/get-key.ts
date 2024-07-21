import type { JudokaType } from '../types/match.type';

type ShortcutJudokaType = 'ippon' | 'wazari' | 'shido' | 'osaekomi';
type ShortcutType = 'play' | ShortcutJudokaType;

const keys: Record<ShortcutJudokaType, Record<JudokaType, string>> = {
  ippon: {
    white: 'A',
    blue: 'H'
  },
  wazari: {
    white: 'S',
    blue: 'J'
  },
  shido: {
    white: 'D',
    blue: 'K'
  },
  osaekomi: {
    white: 'F',
    blue: 'L'
  }
};

export const getKey = (shortcutType: ShortcutType) => (judokaType?: JudokaType) => {
  if (shortcutType === 'play') {
    return ' ';
  }

  if (!judokaType) {
    throw new Error(`Missing judoka type for shortcut ${shortcutType}`);
  }

  return keys[shortcutType][judokaType];
};
