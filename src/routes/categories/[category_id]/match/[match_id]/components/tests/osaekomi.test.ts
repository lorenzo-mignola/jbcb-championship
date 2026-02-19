import type { UserEvent } from '@testing-library/user-event';

import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';

import { matchState } from '../../../../../../../lib/state/match/match-state.svelte';
import Match from '../../+page.svelte';

const data = {
  category: categoryMock,
  isMedalMatch: false,
  match: matchMock,
  nextMatch: match2Mock,
};

async function setupOsaekomi(user: UserEvent, id: string) {
  render(Match, { data });

  // start play timer
  const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
  await user.click(playPauseButton);

  vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
  const card = screen.getByTestId(`judoka-card-${id}`);
  const buttonOsaekomi = within(card).getByRole<HTMLButtonElement>('button', {
    name: /Osae-komi/i,
  });

  await user.click(buttonOsaekomi);
  return {
    card,
    playPauseButton,
  };
}

describe.each([['white', 'blue']] as const)('osaekomi for %s', (type) => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

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

  it('should stop osakeomi when timer is stopped (click)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { playPauseButton } = await setupOsaekomi(user, id);

    expect(screen.getByTestId(`timer-osaekomi-${type}`)).toBeInTheDocument();

    // stop
    await user.click(playPauseButton);

    expect(screen.queryByTestId(`timer-osaekomi-${type}`)).toBeNull();
  });

  it('should stop osakeomi when timer is stopped (keyboard)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    await setupOsaekomi(user, id);

    expect(screen.getByTestId(`timer-osaekomi-${type}`)).toBeInTheDocument();

    // stop
    await user.keyboard(' ');

    expect(screen.queryByTestId(`timer-osaekomi-${type}`)).toBeNull();
  });

  it('should have osakeomi when toketa button is clicked', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    const buttonToketa = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Toketa/i,
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
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('0 1 0');
    });
  });

  it('after 10 seconds should have 1 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    await setupOsaekomi(user, id);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(matchState.match?.[type]?.wazari).toBe(1);
    });
  });

  it('after 20 seconds should have 1 ippon', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);
    await waitFor(() => expect(matchState.match?.[type]?.wazari).toBe(1));

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('1 0 0');
    });

    await waitFor(() => {
      expect(matchState.match?.[type]?.wazari).toBe(0);
      expect(matchState.match?.[type]?.ippon).toBe(1);
    });
  });

  it('when 1 wazari is set after 10 seconds should have 2 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    const { card } = await setupOsaekomi(user, id);

    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i,
    });

    await user.click(buttonWazari);

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(within(card).getByTestId('judoka-score')).toHaveTextContent('0 2 0');
    });

    await waitFor(() => {
      expect(matchState.match?.[type]?.wazari).toBe(2);
      expect(matchState.match?.[type]?.ippon).toBe(0);
      expect(matchState.match?.winner).toBe(type);
    });
  });
});
