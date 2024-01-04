import { getSettings } from '../../lib/db/methods';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  const settings = getSettings();
  return {
    settings
  };
};
