import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { matchState } from '$lib/state/match/match-state.svelte';
import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER, TIME_CLOCK_MULTIPLIER } from '$tests/util/constants';

import Match from '../../+page.svelte';

const data = {
  category: categoryMock,
  isMedalMatch: false,
  match: matchMock,
  nextMatch: match2Mock,
};

async function setupGoldenScore() {
  const user = userEvent.setup();
  render(Match, { data });

  // start play timer
  const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
  await user.click(playPauseButton);

  vi.advanceTimersByTime(data.category.duration * TIME_CLOCK_MULTIPLIER);

  await waitFor(() => {
    expect(screen.getByTestId('timer')).toHaveTextContent('00:00');
  });

  // start golden score
  await user.click(playPauseButton);
  expect(playPauseButton.classList).toContain('stop');
}

describe('golden score', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show the golden score badge when is golden score', async () => {
    await setupGoldenScore();

    expect(screen.getByTestId('golden-score-badge')).toBeVisible();
  });

  it('should have the time go up', async () => {
    await setupGoldenScore();

    vi.advanceTimersByTime(10 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent('00:10');
    });
  });

  it.each([['white', 'blue']] as const)(
    'should set winner %s when wazari on golden score',
    async (type) => {
      const user = userEvent.setup();
      const { id } = data.match[type];

      await setupGoldenScore();

      const card = screen.getByTestId(`judoka-card-${id}`);
      const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
        name: /Waza-ari/i,
      });

      await user.click(buttonWazari);

      expect(matchState.match?.winner).toBe(type);
    },
  );

  it.each([['white', 'blue']] as const)(
    'should set winner %s when wazari on golden score',
    async (type) => {
      const user = userEvent.setup();
      const { id } = data.match[type];

      await setupGoldenScore();

      const card = screen.getByTestId(`judoka-card-${id}`);
      const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
      const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
        name: /Waza-ari/i,
      });

      await user.click(buttonWazari);

      expect(matchState.match?.winner).toBe(type);
      expect(playPauseButton.classList).toContain('play');
    },
  );

  it.each([['white', 'blue']] as const)(
    'should set winner %s when wazari on golden score when score is 1-1',
    async (type) => {
      const user = userEvent.setup();
      const { id } = data.match[type];

      await setupGoldenScore();
      // match.update((currentMatch) =>
      //   produce(currentMatch, (draft) => {
      //     if (draft?.blue && draft.white) {
      //       draft.blue.wazari = 1;
      //       draft.white.wazari = 1;
      //     }
      //   })
      // );

      const card = screen.getByTestId(`judoka-card-${id}`);
      const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
      const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
        name: /Waza-ari/i,
      });

      await user.click(buttonWazari);

      expect(matchState.match?.winner).toBe(type);
      expect(playPauseButton.classList).toContain('play');
    },
  );

  it.each([['white', 'blue']] as const)(
    'should set winner %s when ippon on golden score',
    async (type) => {
      const user = userEvent.setup();
      const { id } = data.match[type];

      await setupGoldenScore();

      const card = screen.getByTestId(`judoka-card-${id}`);
      const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
      const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
        name: /Ippon/i,
      });

      await user.click(buttonIppon);

      expect(matchState.match?.winner).toBe(type);
      expect(playPauseButton.classList).toContain('play');
    },
  );
});
