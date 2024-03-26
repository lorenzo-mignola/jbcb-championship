import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';

import { vi } from 'vitest';

vi.stubGlobal('matchMedia', vi.fn().mockReturnValue([]));

vi.mock('@skeletonlabs/skeleton', async (importOriginal) => {
  const actual = await importOriginal();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- keep all original module
  return {
    ...actual,
    getToastStore: vi.fn().mockResolvedValue({
      trigger: vi.fn()
    })
  };
});