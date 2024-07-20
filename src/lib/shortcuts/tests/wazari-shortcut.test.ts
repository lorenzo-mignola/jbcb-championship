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
  isMedalMatch: false
};

describe('ippon shortcut', () => {
  it.each([
    ['white', 'S'],
    ['blue', 'J']
  ] as const)('should set wazari for %s when "%s" is pressed', async (type, key) => {
    const user = userEvent.setup();
    const { id } = data.match[type];
    render(Match, { data });

    const card = screen.getByTestId(`judoka-card-${id}`);

    await user.keyboard(key);

    expect(within(card).getByTestId('judoka-score')).toHaveTextContent('1');
  });
});
