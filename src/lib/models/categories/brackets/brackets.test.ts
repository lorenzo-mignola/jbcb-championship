import { describe, expect, it } from 'vitest';
import type { Judoka } from '../../../types/Judoka';
import type { Match } from '../../../types/Match';
import { createBrackets, updateBrackets } from './brackets';

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
    [athletes.slice(0, 5), 11],
    [athletes.slice(0, 7), 11],
    [athletes.slice(0, 16), 27],
    [athletes.slice(0, 10), 27],
    [athletes.slice(0, 14), 27],
    [athletes, 59],
    [athletes.slice(0, 19), 59],
    [athletes.slice(0, 24), 59]
  ])('should create matches in brackets', (athleteSlice, totalMatches) => {
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

    expect(firstRoundMatches.every((match) => match.white && match.blue)).toBeTruthy();
    expect(otherMatches.every((match) => !match.white && !match.blue)).toBeTruthy();
  });

  it.each([
    [athletes.slice(0, 4)],
    [athletes.slice(0, 7)],
    [athletes.slice(0, 8)],
    [athletes.slice(0, 16)],
    [athletes]
  ])('should create matches for the first round with every athlete', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice);
    const { rounds } = brackets;
    const firstRoundMatches = rounds[0];

    const ids = firstRoundMatches.winner
      .flatMap((match) => [match.blue?.id, match.white?.id])
      .filter((id): id is string => Boolean(id));

    const setIds = new Set(ids);
    const athleteId = athleteSlice.map((athlete) => athlete.id);

    expect(setIds.size).toBe(athleteId.length);
  });

  it.each([
    [athletes.slice(0, 5), 3],
    [athletes.slice(0, 6), 2],
    [athletes.slice(0, 7), 1],
    [athletes.slice(0, 9), 7],
    [athletes.slice(0, 11), 5],
    [athletes.slice(0, 15), 1]
  ])('should create brackets in with missing matches', (athleteSlice, missingMatch) => {
    const brackets = createBrackets('test', athleteSlice);

    const { rounds } = brackets;
    const [firstRound] = rounds;
    const missingRounds = firstRound.winner.filter(({ blue, white }) => {
      if (!blue && !white) {
        expect.fail("A match in first round can't be empty");
      }
      return !blue || !white;
    });

    expect(missingRounds).toHaveLength(missingMatch);
  });

  it.each([
    [athletes.slice(0, 5)],
    [athletes.slice(0, 6)],
    [athletes.slice(0, 9)],
    [athletes.slice(0, 10)],
    [athletes.slice(0, 11)],
    [athletes.slice(0, 12)],
    [athletes.slice(0, 17)],
    [athletes.slice(0, 18)],
    [athletes.slice(0, 19)],
    [athletes.slice(0, 20)],
    [athletes.slice(0, 21)],
    [athletes.slice(0, 22)],
    [athletes.slice(0, 23)],
    [athletes.slice(0, 24)]
  ])('should create brackets only odd match', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice);

    const { rounds } = brackets;
    const [firstRound] = rounds;
    const evenMatch = firstRound.winner.filter((_, index) => {
      return index % 2 === 0;
    });
    const byeEvenMatch = evenMatch.filter(({ white, blue }) => !white && !blue);

    expect(byeEvenMatch).toHaveLength(0);
  });

  it('should have a current match', () => {
    const brackets = createBrackets('test', athletes.slice(0, 4));

    expect(brackets.currentMatch).toBeDefined();
    expect(brackets.currentMatch).toBeTruthy();
  });

  it.each([
    [athletes.slice(0, 4)],
    [athletes.slice(0, 5)],
    [athletes.slice(0, 6)],
    [athletes.slice(0, 7)],
    [athletes.slice(0, 8)],
    [athletes.slice(0, 9)],
    [athletes.slice(0, 11)],
    [athletes.slice(0, 15)],
    [athletes.slice(0, 16)]
  ])('should set winner second match', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice);
    const matchesSetLengths = brackets.matches.filter(
      ({ white, blue }) => !!white || !!blue
    ).length;

    const firstMatch = brackets.rounds[0].winner[1];
    const { blue } = firstMatch;
    const winner = 'blue';

    const firstMatchUpdated: Match = {
      ...firstMatch,
      winner
    };

    const bracketsUpdated = updateBrackets(brackets, firstMatchUpdated);
    const updatedMatchesSetLengths = bracketsUpdated.matches.filter(
      ({ white, blue }) => !!white || !!blue
    ).length;

    expect(bracketsUpdated.rounds[0].winner[0].winner).toBe('blue');
    expect(brackets.matches[1].id).toBe(bracketsUpdated.matches[1].id);
    expect(updatedMatchesSetLengths).toBe(matchesSetLengths + 1);
    expect(bracketsUpdated.rounds[1].winner[0].blue!.id).toBe(blue!.id);
  });
});
