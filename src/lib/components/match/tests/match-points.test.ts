import { match } from '$lib/store/$match';
import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { ONE_SECOND_TIMER } from '$tests/util/constants';
import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';
import { getOpponentType } from '../../../utils/judoka';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: match2Mock,
  isMedalMatch: false
};

describe.each([['white'], ['blue']] as const)('point for judoka %s on timer stop', (type) => {
  it('should set 10 when ippon', async () => {
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

  it('should set 1 when wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);

    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });
    await user.click(buttonWazari);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('1');
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should set 10 when 2 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);

    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });
    await user.click(buttonWazari);
    await user.click(buttonWazari);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set winner when ippon', async () => {
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

  it('should set winner when 2 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    await user.click(buttonWazari);
    await user.click(buttonWazari);

    expect(get(match)?.winner).toBe(type);
  });

  it('should add a yellow card when is shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(buttonShido);

    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(1);
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should add 2 yellow card when is 2 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(buttonShido);
    await user.click(buttonShido);

    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(2);
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should set red card when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(buttonShido);
    await user.click(buttonShido);
    await user.click(buttonShido);

    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(0);
    expect(within(card).queryAllByTestId('shido-red')).toHaveLength(1);
  });

  it('should set 10 to opponent when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is never null
    const { id: opponentId } = data.match[getOpponentType(type)!];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const opponentCard = screen.getByTestId(`judoka-card-${opponentId}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(buttonShido);
    await user.click(buttonShido);
    await user.click(buttonShido);

    expect(within(opponentCard).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set opponent as when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(buttonShido);
    await user.click(buttonShido);
    await user.click(buttonShido);

    expect(get(match)?.winner).toBe(getOpponentType(type));
  });
});

describe.each([['white'], ['blue']] as const)('point for judoka %s on timer play', (type) => {
  // eslint-disable-next-line vitest/no-hooks -- mock timer
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  // eslint-disable-next-line vitest/no-hooks -- remove mock timer
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set 10 when ippon', async () => {
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
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set 1 when wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonWazari);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('1');
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should set 10 when 2 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonWazari);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonWazari);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set winner when ippon', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonIppon = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonIppon);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(get(match)?.winner).toBe(type);
  });

  it('should set winner when 2 wazari', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonWazari = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonWazari);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonWazari);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(get(match)?.winner).toBe(type);
  });

  it('should add a yellow card when is shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);

    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(1);
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should add 2 yellow card when is 2 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);

    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(2);
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should set red card when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(within(card).queryAllByTestId('shido-yellow')).toHaveLength(0);
    expect(within(card).queryAllByTestId('shido-red')).toHaveLength(1);
  });

  it('should set 10 to opponent when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is never null
    const { id: opponentId } = data.match[getOpponentType(type)!];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const opponentCard = screen.getByTestId(`judoka-card-${opponentId}`);
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(within(opponentCard).getByTestId('judoka-score')).toHaveTextContent('10');
  });

  it('should set opponent as when is 3 shido', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonShido = within(card).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    await user.click(playPauseButton);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);
    vi.advanceTimersByTime(3 * ONE_SECOND_TIMER);
    await user.click(buttonShido);

    await waitFor(() => {
      expect(playPauseButton.classList).toContain('play');
    });
    expect(get(match)?.winner).toBe(getOpponentType(type));
  });

  it('should have "Osaekomi" button enabled when time is playing', async () => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    // start play timer
    const playPauseButton = screen.getByTestId<HTMLButtonElement>('play-pause');
    const buttonOsaekomi = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Osae-komi/i
    });

    await user.click(playPauseButton);

    vi.advanceTimersByTime(ONE_SECOND_TIMER);

    expect(buttonOsaekomi.disabled).toBeFalsy();
  });
});
