import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';

vi.stubGlobal('matchMedia', vi.fn().mockReturnValue([]));

vi.mock('@skeletonlabs/skeleton', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-expect-error -- keep all original module
    ...actual,
    getDrawerStore: vi.fn().mockReturnValue({
      id: '',
      open: vi.fn(),
    }),
    getToastStore: vi.fn().mockReturnValue({
      trigger: vi.fn(),
    }),
  };
});
