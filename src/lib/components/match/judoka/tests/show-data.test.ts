import matchMock from '$tests/mock/match.json';
import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { match } from '../../../../store/$match';
import Judoka from '../judoka.svelte';

describe('show data', () => {
  // eslint-disable-next-line vitest/no-hooks -- initialize store
  beforeEach(() => {
    match.set(matchMock);
  });

  it('should render white judoka', () => {
    const WHITE_ID = matchMock.white.id;
    render(Judoka, { type: 'white' });

    const card = screen.getByTestId(`judoka-card-${WHITE_ID}`);

    expect(card).toBeInTheDocument();
  });
});
