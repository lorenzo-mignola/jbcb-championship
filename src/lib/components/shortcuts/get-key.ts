import type { JudokaType } from '../../types/match.type';

type ShortcutJudokaType = 'ippon' | 'wazari' | 'shido' | 'osaekomi';
type ShortcutType = 'play' | ShortcutJudokaType;

const keys: Record<ShortcutJudokaType, Record<JudokaType, string>> = {
  ippon: {
    blue: 'H',
    white: 'A',
  },
  osaekomi: {
    blue: 'L',
    white: 'F',
  },
  shido: {
    blue: 'K',
    white: 'D',
  },
  wazari: {
    blue: 'J',
    white: 'S',
  },
};

export function getKey(shortcutType: ShortcutType) {
  return (judokaType?: JudokaType) => {
    if (shortcutType === 'play') {
      return ' ';
    }

    if (!judokaType) {
      throw new Error(`Missing judoka type for shortcut ${shortcutType}`);
    }

    return keys[shortcutType][judokaType];
  };
}
