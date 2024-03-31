import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';
import { render, screen, within } from '@testing-library/svelte';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: match2Mock,
  isMedalMatch: false
};

async function setupOsaekomi(user: UserEvent) {
  render(Match, { data });

  // start play timer
  const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
  await user.click(playPauseButton);

  vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
}

describe.each([['white', 'blue']] as const)('osaekomi for %s', (type) => {
  // eslint-disable-next-line vitest/no-hooks -- mock timer
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  // eslint-disable-next-line vitest/no-hooks -- remove mock timer
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should activate osaekomi on click', async () => {
    const user = userEvent.setup();
    await setupOsaekomi(user);
    const { id } = data.match[type];

    const buttonOsaekomi = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Osae-komi/i
    });

    await user.click(buttonOsaekomi);

    expect(screen.getByTestId(`timer-osaekomi-${type}`)).toBeInTheDocument();
  });

  it('should have toketa button', async () => {
    const user = userEvent.setup();
    await setupOsaekomi(user);
    const { id } = data.match[type];

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonOsaekomi = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Osae-komi/i
    });

    await user.click(buttonOsaekomi);

    expect(within(card).getByRole('button', { name: /Toketa/i })).toBeInTheDocument();
  });

  it('should have osakeomi when toketa button is clicked', async () => {
    const user = userEvent.setup();
    await setupOsaekomi(user);
    const { id } = data.match[type];

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonOsaekomi = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Osae-komi/i
    });

    await user.click(buttonOsaekomi);

    const buttonToketa = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Toketa/i
    });

    await user.click(buttonToketa);

    expect(within(card).getByRole('button', { name: /Osae-komi/i })).toBeInTheDocument();
    expect(screen.queryByTestId(`timer-osaekomi-${type}`)).not.toBeInTheDocument();
  });
});
