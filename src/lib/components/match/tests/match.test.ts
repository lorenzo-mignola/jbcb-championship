import categoryMock from '$tests/mock/category.json';
import matchMock from '$tests/mock/match.json';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Match from '../../../../routes/categories/[category_id]/match/[match_id]/+page.svelte';

const data = {
  category: categoryMock,
  match: matchMock,
  nextMatch: matchMock,
  isMedalMatch: false
};

describe('<Match />', () => {
  it('should render the category name', () => {
    render(Match, { data });

    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument();
  });
});
