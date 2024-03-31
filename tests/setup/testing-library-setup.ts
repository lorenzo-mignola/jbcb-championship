import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';

import { vi } from 'vitest';

vi.stubGlobal('matchMedia', vi.fn().mockReturnValue([]));

vi.mock('@skeletonlabs/skeleton', async (importOriginal) => {
  const actual = await importOriginal();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- keep all original module
  return {
    // @ts-expect-error -- keep all original module
    ...actual,
    getToastStore: vi.fn().mockReturnValue({
      trigger: vi.fn()
    })
  };
});
