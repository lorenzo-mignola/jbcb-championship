import { describe, expect, it } from 'vitest';
import type { Judoka } from '../../types/Judoka';
import { createBrackets } from './brackets';

const athletes: Judoka[] = [
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' },
  { id: '6', name: '6' },
  { id: '7', name: '7' },
  { id: '8', name: '8' },
  { id: '9', name: '9' },
  { id: '10', name: '10' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
  { id: '13', name: '13' },
  { id: '14', name: '14' },
  { id: '15', name: '15' },
  { id: '16', name: '16' },
  { id: '17', name: '17' },
  { id: '18', name: '18' },
  { id: '19', name: '19' },
  { id: '20', name: '20' },
  { id: '21', name: '21' },
  { id: '22', name: '22' },
  { id: '23', name: '23' },
  { id: '24', name: '24' },
  { id: '25', name: '25' },
  { id: '26', name: '26' },
  { id: '27', name: '27' },
  { id: '28', name: '28' },
  { id: '29', name: '29' },
  { id: '30', name: '30' },
  { id: '31', name: '31' },
  { id: '32', name: '32' }
];

describe('createBrackets', () => {
  it.each([
    [athletes.slice(0, 4), 3],
    [athletes.slice(0, 8), 11],
    [athletes.slice(0, 16), 27],
    [athletes, 59]
  ])('should create brackets in match', (athleteSlice, totalMatches) => {
    const brackets = createBrackets('test', athleteSlice);

    expect(brackets.matches).toHaveLength(totalMatches);
  });

  it.each([
    [athletes.slice(0, 4), 2],
    [athletes.slice(0, 8), 4],
    [athletes.slice(0, 16), 8],
    [athletes, 16]
  ])('should create matches for the first round', (athleteSlice, nrFirstRoundMatch) => {
    const brackets = createBrackets('test', athleteSlice);
    const { matches } = brackets;
    const firstRoundMatches = matches.slice(0, nrFirstRoundMatch);
    const otherMatches = matches.slice(nrFirstRoundMatch);

    expect(firstRoundMatches.every((match) => match !== null)).toBeTruthy();
    expect(otherMatches.every((match) => match === null)).toBeTruthy();
  });

  it.each([[athletes.slice(0, 4)], [athletes.slice(0, 8)], [athletes.slice(0, 16)], [athletes]])(
    'should create matches for the first round with every athlete',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice);
      const { rounds } = brackets;
      const firstRoundMatches = rounds[0];

      const ids = firstRoundMatches.winner
        .flatMap((athlete) => [athlete?.blue.id, athlete?.white.id])
        .filter((id): id is string => Boolean(id));

      const setIds = new Set(ids);
      const athleteId = athleteSlice.map((athlete) => athlete.id);

      expect(setIds.size).toBe(athleteId.length);
    }
  );
});