import { cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

import { matchState } from '../../src/lib/state/match/match-state.svelte';
import { osaekomiState } from '../../src/lib/state/match/osaekomi-state.svelte';
import { timerState } from '../../src/lib/state/match/timer-state.svelte';

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

beforeEach(() => {
  matchState.match = undefined;
  timerState.reset();
  osaekomiState.resetOsaekomi();
});

// do not print console.warn
console.warn = () => undefined;

afterEach(() => {
  cleanup();
});
