import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ONE_SECOND_TIMER } from '../../../../../tests/util/constants';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';
import { formatTimeString } from '../../../store/$timer';

vi.mock('axios');

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: match2Mock,
  isMedalMatch: false
};

describe('next match', () => {
  // eslint-disable-next-line vitest/no-hooks -- mock timer
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  // eslint-disable-next-line vitest/no-hooks -- remove mock timer
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reset timer', async () => {
    const mockedAxios = vi.mocked(axios);
    // @ts-expect-error -- mock response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- mock response
    mockedAxios.patch.mockResolvedValueOnce({
      data: {
        ...categoryMock,
        currentMatch: match2Mock.id
      }
    });

    const user = userEvent.setup();
    const { id } = data.match.white;
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    await user.click(playPauseButton);

    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent(
        formatTimeString(data.category.duration - 3 * 10)
      );
    });
    await user.click(buttonIppon);

    await user.click(screen.getByText('Termina incontro'));

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent(
        formatTimeString(data.category.duration)
      );
    });
    expect(screen.getByTestId<HTMLButtonElement>('play-pause').classList).toContain('play');
  });
});
