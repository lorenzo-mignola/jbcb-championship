import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import matc2hMock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER, TIME_CLOCK_MULTIPLIER } from '$tests/util/constants';
import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: matc2hMock,
  isMedalMatch: false
};

describe('match data', () => {
  it('should render the category name', () => {
    render(Match, { data });

    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument();
  });

  it('should render next match', () => {
    render(Match, { data });
    const nextMatchElement = screen.getByTestId('next-match');

    expect(within(nextMatchElement).getByText('BIANCO judoka')).toBeInTheDocument();
    expect(within(nextMatchElement).getByText('BLU judoka')).toBeInTheDocument();
  });
});

describe('initial state match', () => {
  it('should render the time', () => {
    render(Match, { data });

    expect(screen.getByTestId('timer')).toHaveTextContent('02:00');
  });

  it('should have the play button enabled', () => {
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    expect(playPauseButton.disabled).toBeFalsy();
  });

  it('should have the play button enabled with "play" class', () => {
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    expect(playPauseButton.classList).toContain('play');
  });

  it('should have the play button enabled with "play" icon', () => {
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    expect(within(playPauseButton).getByTestId('play-icon')).toBeInTheDocument();
  });
});

describe('play timer', () => {
  it('when play button is clicked should have "stop" class', async () => {
    const user = userEvent.setup();
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    await user.click(playPauseButton);

    expect(playPauseButton.classList).toContain('stop');
  });

  it('when play button is clicked should have "stop" icon', async () => {
    const user = userEvent.setup();
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    await user.click(playPauseButton);

    expect(within(playPauseButton).getByTestId('stop-icon')).toBeInTheDocument();
  });
});

describe('end match', () => {
  // eslint-disable-next-line vitest/no-hooks -- mock timer
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  // eslint-disable-next-line vitest/no-hooks -- remove mock timer
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('after 2 sec timer should show (categoryDuration - 2)', async () => {
    const user = userEvent.setup();
    render(Match, { data });

    // start play timer
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    await user.click(playPauseButton);

    vi.advanceTimersByTime(2 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent('01:58');
    });
  });

  it('when time is ended timer should be 00:00', async () => {
    const user = userEvent.setup();
    render(Match, { data });

    // start play timer
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    await user.click(playPauseButton);

    vi.advanceTimersByTime(data.category.duration * TIME_CLOCK_MULTIPLIER);

    await waitFor(() => {
      expect(screen.getByTestId('timer')).toHaveTextContent('00:00');
    });
  });

  it('when time is ended should show play button', async () => {
    const user = userEvent.setup();
    render(Match, { data });

    // start play timer
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    await user.click(playPauseButton);

    vi.advanceTimersByTime(data.category.duration * TIME_CLOCK_MULTIPLIER);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(within(playPauseButton).getByTestId('play-icon')).toBeInTheDocument();
  });
});
