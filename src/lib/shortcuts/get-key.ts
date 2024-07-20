import type { JudokaType } from '../types/match.type';

type ShortcutType = 'play' | 'ippon' | 'wazari' | '';

const isWhite = (judokaType: JudokaType) => judokaType === 'white';
const isBlue = (judokaType: JudokaType) => judokaType === 'blue';

const playKey = () => ' ';

const ipponKey = (judokaType: JudokaType) => {
  if (isWhite(judokaType)) {
    return 'A';
  }

  if (isBlue(judokaType)) {
    return 'H';
  }

  return '';
};

const wazariKey = (judokaType: JudokaType) => {
  if (isWhite(judokaType)) {
    return 'S';
  }

  if (isBlue(judokaType)) {
    return 'J';
  }

  return '';
};

export const getKey = (shortcutType: ShortcutType) => (judokaType?: JudokaType) => {
  if (shortcutType === 'play') {
    return playKey();
  }

  if (!judokaType) {
    throw new Error(`Missing judoka type for shortcut ${shortcutType}`);
  }

  if (shortcutType === 'ippon') {
    return ipponKey(judokaType);
  }

  if (shortcutType === 'wazari') {
    return wazariKey(judokaType);
  }

  return '';
};
