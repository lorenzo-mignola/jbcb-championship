import type { MockedFunction } from 'vitest';

import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ky from 'ky';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatTimeString } from '$lib/utils/timer-utils';
import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';

import Match from '../../+page.svelte';

vi.mock('ky');

const data = {
  category: categoryMock,
  isMedalMatch: false,
  match: matchMock,
  nextMatch: match2Mock,
};

describe('next match', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reset timer', async () => {
    const mockedKy = vi.mocked(ky);
    const mockPatch = mockedKy.patch as unknown as MockedFunction<any>;

    mockPatch.mockResolvedValueOnce({
      data: {
        ...categoryMock,
        currentMatch: match2Mock.id,
      },
    });

    const user = userEvent.setup();
    const { id } = data.match.white;
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i,
    });

    await user.click(playPauseButton);

    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent(
        formatTimeString(data.category.duration - 3 * 10),
      );
    });
    await user.click(buttonIppon);

    await user.click(screen.getByText('Termina incontro'));

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent(
        formatTimeString(data.category.duration),
      );
    });
    expect(screen.getByTestId<HTMLButtonElement>('play-pause').classList).toContain('play');
  });
});
