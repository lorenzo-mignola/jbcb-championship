import '@testing-library/jest-dom/vitest';
import '@testing-library/svelte/vitest';

import { vi } from 'vitest';

vi.stubGlobal('matchMedia', vi.fn().mockReturnValue([]));
