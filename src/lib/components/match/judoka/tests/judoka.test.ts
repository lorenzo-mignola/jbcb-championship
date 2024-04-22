import matchMock from '$tests/mock/match.json';
import { render, screen, within } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import { match } from '../../../../store/$match';
import Judoka from '../judoka.svelte';

describe.each([['white'], ['blue']] as const)('<Judoka /> of type => %s', (type) => {
  // eslint-disable-next-line vitest/no-hooks -- initialize store
  beforeEach(() => {
    match.set(matchMock);
  });

  it('should render the card', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    expect(screen.getByTestId(`judoka-card-${id}`)).toBeInTheDocument();
  });

  it('should render the name', () => {
    const { name } = matchMock[type];

    render(Judoka, { type });

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('should render the initial score as 0', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    expect(
      within(screen.getByTestId(`judoka-card-${id}`)).getByTestId('judoka-score')
    ).toHaveTextContent('0');
  });

  it('should render the "ippon" button enabled', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    const buttonIppon = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Ippon/i
    });

    expect(buttonIppon.disabled).toBeFalsy();
  });

  it('should render the "waza-ari" button enabled', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    const buttonWazari = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Waza-ari/i
    });

    expect(buttonWazari.disabled).toBeFalsy();
  });

  it('should render the "shido" button enabled', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    const buttonShido = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Shido/i
    });

    expect(buttonShido.disabled).toBeFalsy();
  });

  it('should render the "osaekomi" button disabled', () => {
    const { id } = matchMock[type];

    render(Judoka, { type });

    const buttonOsaekomi = within(
      screen.getByTestId(`judoka-card-${id}`)
    ).getByRole<HTMLButtonElement>('button', {
      name: /Osae-komi/i
    });

    expect(buttonOsaekomi.disabled).toBeTruthy();
  });
});
