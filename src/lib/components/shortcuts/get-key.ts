import type { JudokaType } from '../../types/match.type';

type ShortcutJudokaType = 'ippon' | 'wazari' | 'yuko' | 'shido' | 'osaekomi';
type ShortcutType = 'play' | ShortcutJudokaType;

const keys: Record<ShortcutJudokaType, Record<JudokaType, string>> = {
  ippon: {
    blue: 'J',
    white: 'A',
  },
  osaekomi: {
    blue: 'H',
    white: 'G',
  },
  shido: {
    blue: 'P',
    white: 'Q',
  },
  wazari: {
    blue: 'K',
    white: 'S',
  },
  yuko: {
    blue: 'L',
    white: 'D',
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
