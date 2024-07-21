import { identity } from 'ramda';

import type { ShortcutFunction } from './shortcut-function.type';

export const runIfNotDisabled = (
  callback: ShortcutFunction,
  disabled: boolean
): ShortcutFunction => {
  if (!disabled) {
    return callback;
  }
  return identity;
};
