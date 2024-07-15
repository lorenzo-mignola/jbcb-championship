import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { produce } from 'immer';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';

import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';

import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';
import { match } from '../../../store/$match';
import type { JudokaType } from '../../../types/match.type';
import { getOpponentType } from '../../../utils/judoka';

const mock = {
  category: categoryMock,
  match: {
    ...matchMock,
    winner: undefined as JudokaType | undefined
  },
  nextMatch: match2Mock,
  isMedalMatch: false
};

describe.each([['white'], ['blue']] as const)('point edit for judoka %s', (type) => {
  it('should not render edit button', () => {
    const { id } = mock.match[type];
    render(Match, {
      data: mock
    });

    const card = screen.getByTestId(`judoka-card-${id}`);

    expect(within(card).queryByTestId('edit-point')).not.toBeInTheDocument();
  });

  it('should render edit button when 1 point is set', () => {
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].wazari = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);

    expect(within(card).getByTestId('edit-point')).toBeVisible();
  });

  it('should render edit button when 1 shido is set', () => {
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].shido = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);

    expect(within(card).getByTestId('edit-point')).toBeVisible();
  });

  it('should have edit button with active class when clicked', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].shido = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');

    await user.click(editButton);

    expect(editButton.classList).toContain('active');
  });

  it('should have remove button "Ippon"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].ippon = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');

    await user.click(editButton);

    expect(
      within(card).getByRole('button', {
        name: /Ippon/i
      })
    );
    expect(
      within(within(card).getByTestId('points-container')).queryAllByRole('button')
    ).toHaveLength(1);
  });

  it('should have remove button "Wazari"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].wazari = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');

    await user.click(editButton);

    expect(
      within(card).getByRole('button', {
        name: /Waza-ari/i
      })
    );
    expect(
      within(within(card).getByTestId('points-container')).queryAllByRole('button')
    ).toHaveLength(1);
  });

  it('should have remove button "Shido"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].shido = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');

    await user.click(editButton);

    expect(
      within(card).getByRole('button', {
        name: /Shido/i
      })
    );
    expect(
      within(within(card).getByTestId('points-container')).queryAllByRole('button')
    ).toHaveLength(1);
  });

  it('should remove "Ippon"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].ippon = 1;
        data.match.winner = type;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');
    await user.click(editButton);

    const ipponButton = within(card).getByRole('button', {
      name: /Ippon/i
    });
    await user.click(ipponButton);

    expect(get(match)?.[type]?.ippon).toBe(0);
    expect(get(match)?.winner).toBeUndefined();
  });

  it('should remove "Wazari"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].wazari = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');
    await user.click(editButton);

    const wazariButton = within(card).getByRole('button', {
      name: /Waza-ari/i
    });
    await user.click(wazariButton);

    expect(get(match)?.[type]?.wazari).toBe(0);
  });

  it('should remove 2 "Wazari"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].wazari = 2;
        data.match.winner = type;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');
    await user.click(editButton);

    const wazariButton = within(card).getByRole('button', {
      name: /Waza-ari/i
    });
    await user.click(wazariButton);

    expect(get(match)?.winner).toBeUndefined();
  });

  it('should remove "Shido"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        data.match[type].shido = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');
    await user.click(editButton);

    const shidoButton = within(card).getByRole('button', {
      name: /Shido/i
    });
    await user.click(shidoButton);

    expect(get(match)?.[type]?.shido).toBe(0);
  });

  it('should remove 3 "Shido"', async () => {
    const user = userEvent.setup();
    const { id } = mock.match[type];
    render(Match, {
      data: produce(mock, (data) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- type is present
        const opponentType = getOpponentType(type)!;
        data.match[type].shido = 3;
        data.match.winner = opponentType;
        data.match[opponentType].ippon = 1;
      })
    });

    const card = screen.getByTestId(`judoka-card-${id}`);
    const editButton = within(card).getByTestId('edit-point');
    await user.click(editButton);

    const shidoButton = within(card).getByRole('button', {
      name: /Shido/i
    });
    await user.click(shidoButton);

    expect(get(match)?.winner).toBeUndefined();
  });
});
