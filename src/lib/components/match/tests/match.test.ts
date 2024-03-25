import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import matc2hMock from '$tests/mock/match2.json';
import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
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

  it('should have the play button enabled with the "play" class', () => {
    render(Match, { data });

    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');

    expect(playPauseButton.classList).toContain('play');
  });
});
