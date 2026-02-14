import type { UserEvent } from '@testing-library/user-event';

import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Match from '$routes/categories/[category_id]/match/[match_id]/+page.svelte';
import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';

export const osaekomiTestData = {
  category: categoryMock,
  isMedalMatch: false,
  match: matchMock,
  nextMatch: match2Mock,
};

export async function setupOsaekomiTest(user: UserEvent, id: string) {
  render(Match, { data: osaekomiTestData });

  // start play timer
  const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
  await user.click(playPauseButton);

  vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
  const card = screen.getByTestId(`judoka-card-${id}`);
  return {
    card,
    playPauseButton,
  };
}

describe.each([
  ['white', 'F'],
  ['blue', 'L'],
] as const)('osaekomi for %s when "%s" is pressed', (type, key) => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should activate osaekomi on click', async () => {
    const user = userEvent.setup();
    const { id } = osaekomiTestData.match[type];
    await setupOsaekomiTest(user, id);

    await user.keyboard(key);

    expect(screen.getByTestId(`timer-osaekomi-${type}`)).toBeInTheDocument();
  });

  it('should start and stop button', async () => {
    const user = userEvent.setup();
    const { id } = osaekomiTestData.match[type];
    const { card } = await setupOsaekomiTest(user, id);

    // start osaekomi
    await user.keyboard(key);

    expect(
      within(card).getByRole('button', { name: /Toketa/i }),
    ).toBeInTheDocument();

    // stop osaekomi
    await user.keyboard(key);

    expect(
      within(card).getByRole('button', { name: /Osae-komi/i }),
    ).toBeInTheDocument();
  });
});
