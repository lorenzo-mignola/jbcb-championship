import { match } from '$lib/store/$match';
import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import matc2hMock from '$tests/mock/match2.json';
import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: matc2hMock,
  isMedalMatch: false
};

describe.each([['white'], ['blue']] as const)('point for judoka %s', (type) => {
  it('should set 10 when ippon (stop timer)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);

    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });
    await user.click(buttonIppon);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set winner when ippon (stop timer)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    await user.click(buttonIppon);

    expect(get(match)?.winner).toBe(type);
  });

  it('should set 10 when ippon (play timer)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    await user.click(playPauseButton);
    await user.click(buttonIppon);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set winner when ippon (play timer)', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    await user.click(playPauseButton);
    await user.click(buttonIppon);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(get(match)?.winner).toBe(type);
  });
});
