import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { produce } from 'immer';
import { describe, expect, it } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const mock = {
  category: categoryMock,
  match: matchMock,
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
});
