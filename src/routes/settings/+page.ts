import { getSettings } from '../../lib/db/methods';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const settings = getSettings();
  return {
    settings
  };
};
