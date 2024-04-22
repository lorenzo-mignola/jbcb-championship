import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';

import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';
import { match } from '../../../store/$match';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: match2Mock,
  isMedalMatch: false
};

async function setupOsaekomi(user: UserEvent, id: string) {
  render(Match, { data });

  // start play timer
  const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
  await user.click(playPauseButton);

  vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
  const card = screen.getByTestId(`judoka-card-${id}`);
  const buttonOsaekomi = within(card).getByRole<HTMLButtonElement>('button', {
    name: /Osae-komi/i
  });

  await user.click(buttonOsaekomi);
  return {
    card
  };
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
    const { id } = data.match[type];
    await setupOsaekomi(user, id);

    expect(screen.getByTestId(`timer-osaekomi-${type}`)).toBeInTheDocument();
  });

  it('should have toketa button', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    expect(within(card).getByRole('button', { name: /Toketa/i })).toBeInTheDocument();
  });

  it('should have osakeomi when toketa button is clicked', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    const buttonToketa = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Toketa/i
    });

    await user.click(buttonToketa);

    expect(within(card).getByRole('button', { name: /Osae-komi/i })).toBeInTheDocument();
    expect(screen.queryByTestId(`timer-osaekomi-${type}`)).not.toBeInTheDocument();
  });

  it('after 10 seconds should have 1 point', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('1');
    });
  });

  it('after 10 seconds should have 1 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    await setupOsaekomi(user, id);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(get(match)?.[type]?.wazari).toBe(1);
    });
  });

  it('after 20 seconds should have 1 ippon', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    vi.advanceTimersByTime(20 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
    });
  });

  it('after 20 seconds should have 1 ippon', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    await setupOsaekomi(user, id);

    vi.advanceTimersByTime(20 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(get(match)?.[type]?.wazari).toBe(2);
    });
  });

  it('when 1 wazari is set after 10 seconds should have 1 ippon', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    await user.click(buttonWazari);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
    });
  });
});
