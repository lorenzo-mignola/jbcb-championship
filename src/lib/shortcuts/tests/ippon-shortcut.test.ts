import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import match2Mock from '$tests/mock/match2.json';

import Match from '../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: match2Mock,
  isMedalMatch: false,
  winner: null
};

describe('ippon shortcut', () => {
  it.each([
    ['white', 'A'],
    ['blue', 'H']
  ] as const)('should set ippon for %s when "%s" is pressed', async (type, key) => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);

    await user.keyboard(key);

    expect(within(card).getByTestId('judoka-score').textContent).toBe('10');
  });

  it.each([
    ['white', 'A'],
    ['blue', 'H']
  ] as const)(
    'should not set ippon for %s when "%s" is pressed because button is disabled',
    async (type, key) => {
      const user = userEvent.setup();
      const dataWithWinner = {
        ...data,
        match: {
          ...data.match,
          winner: type // disable buttons
        }
      };
      const { id } = dataWithWinner.match[type];
      render(Match, { data: dataWithWinner });

      const card = screen.getByTestId(`judoka-card-${id}`);

      await user.keyboard(key);

      expect(within(card).getByTestId('judoka-score').textContent).toBe('0');
    }
  );
});
