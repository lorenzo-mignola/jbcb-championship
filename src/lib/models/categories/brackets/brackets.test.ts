/* eslint-disable @typescript-eslint/no-non-null-assertion -- test fail if is null*/
import { describe, expect, it } from 'vitest';
import type { BracketsCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import type { Match } from '../../../types/match.type';
import { createBrackets, updateBrackets } from './brackets';
import { getCurrentMatch } from './get-current-match';

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
    const brackets = createBrackets('test', athleteSlice, 0);

    expect(brackets.matches).toHaveLength(totalMatches);
  });

  it.each([
    [athletes.slice(0, 4), 2],
    [athletes.slice(0, 8), 4],
    [athletes.slice(0, 16), 8],
    [athletes, 16]
  ])('should create matches for the first round', (athleteSlice, nrFirstRoundMatch) => {
    const brackets = createBrackets('test', athleteSlice, 0);
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
    const brackets = createBrackets('test', athleteSlice, 0);
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
    const brackets = createBrackets('test', athleteSlice, 0);

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
    const brackets = createBrackets('test', athleteSlice, 0);

    const { rounds } = brackets;
    const [firstRound] = rounds;
    const evenMatch = firstRound.winner.filter((_, index) => {
      return index % 2 === 0;
    });
    const byeEvenMatch = evenMatch.filter(({ white, blue }) => !white && !blue);

    expect(byeEvenMatch).toHaveLength(0);
  });

  it('should have a current match', () => {
    const brackets = createBrackets('test', athletes.slice(0, 4), 0);

    expect(brackets.currentMatch).toBeDefined();
    expect(brackets.currentMatch).toBeTruthy();
  });
});
describe('updateBrackets', () => {
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
    const brackets = createBrackets('test', athleteSlice, 0);
    const matchesSetLengths = brackets.matches.filter(
      ({ white, blue }) => Boolean(white) || Boolean(blue)
    ).length;

    const firstMatch = brackets.rounds[0].winner[1];
    const { blue: blueFirst } = firstMatch;
    const winner = 'blue';

    const secondMatchUpdated: Match = {
      ...firstMatch,
      winner
    };

    const bracketsUpdated = updateBrackets(brackets as BracketsCategory, secondMatchUpdated);
    const updatedMatchesSetLengths = bracketsUpdated.matches.filter(
      ({ white, blue }) => Boolean(white) || Boolean(blue)
    ).length;

    expect(bracketsUpdated.rounds[0].winner[1].winner).toBe('blue');
    expect(brackets.matches[1].id).toBe(bracketsUpdated.matches[1].id);
    expect(updatedMatchesSetLengths).toBeGreaterThan(matchesSetLengths);
    expect(bracketsUpdated.rounds[1].winner[0].blue!.id).toBe(blueFirst!.id);
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
  ])('should set winner first match', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice, 0);
    const matchesSetLengths = brackets.matches.filter(
      ({ white, blue }) => Boolean(white) || Boolean(blue)
    ).length;

    const firstMatch = brackets.rounds[0].winner[0];
    const { white: whiteFirst } = firstMatch;
    if (!whiteFirst) {
      expect.fail("white can't be undefined");
    }
    const winner = 'white';

    const firstMatchUpdated: Match = {
      ...firstMatch,
      white: {
        ...whiteFirst,
        ippon: 1,
        wazari: 1,
        shido: 1
      },
      finalTime: 1,
      winner
    };

    const bracketsUpdated = updateBrackets(brackets as BracketsCategory, firstMatchUpdated);
    const updatedMatchesSetLengths = bracketsUpdated.matches.filter(
      ({ white, blue }) => Boolean(white) || Boolean(blue)
    ).length;

    expect(bracketsUpdated.rounds[0].winner[0].winner).toBe('white');
    expect(brackets.matches[0].id).toBe(bracketsUpdated.matches[0].id);
    expect(updatedMatchesSetLengths).toBeGreaterThan(matchesSetLengths);
    expect(bracketsUpdated.rounds[1].winner[0].white!.id).toBe(whiteFirst.id);
    expect(bracketsUpdated.rounds[1].winner[0].white!.ippon).toBe(0);
    expect(bracketsUpdated.rounds[1].winner[0].white!.wazari).toBe(0);
    expect(bracketsUpdated.rounds[1].winner[0].white!.shido).toBe(0);
    expect(bracketsUpdated.rounds[1].winner[0].finalTime).toBe(null);
    expect(bracketsUpdated.rounds[1].winner[0].blue).toBeUndefined();
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
  ])('should set winner last match', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice, 0);

    const firstRound = brackets.rounds[0];
    const lastMatch = firstRound.winner[firstRound.winner.length - 1];
    const { white } = lastMatch;
    const winner = 'white';

    const lastMatchUpdated: Match = {
      ...lastMatch,
      winner
    };

    const bracketsUpdated = updateBrackets(brackets as BracketsCategory, lastMatchUpdated);
    const secondRound = bracketsUpdated.rounds[1];
    const lastMatchSecondRound = secondRound.winner[secondRound.winner.length - 1];

    expect(lastMatchSecondRound.blue!.id).toBe(white!.id);
  });

  it.each([
    [athletes.slice(0, 5)],
    [athletes.slice(0, 6)],
    [athletes.slice(0, 7)],
    [athletes.slice(0, 8)],
    [athletes.slice(0, 9)],
    [athletes.slice(0, 11)],
    [athletes.slice(0, 15)],
    [athletes.slice(0, 16)]
  ])('should set winner first match in second round', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice, 0);

    const firstMatch = brackets.rounds[0].winner[0];
    const bracketsUpdatedFirst = updateBrackets(brackets as BracketsCategory, {
      ...firstMatch,
      winner: 'white'
    });

    const secondMatch = bracketsUpdatedFirst.rounds[1].winner[0];
    const { white } = secondMatch;
    const bracketsUpdated = updateBrackets(bracketsUpdatedFirst, {
      ...secondMatch,
      winner: 'white'
    });

    expect(bracketsUpdated.rounds[1].winner[0].white!.id).toBe(white!.id);
    expect(bracketsUpdated.rounds[2].winner[0].white!.id).toBe(white!.id);
  });

  it.each([[athletes.slice(0, 8)], [athletes.slice(0, 16)], [athletes]])(
    'should set loser first match',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatch = brackets.rounds[0].winner[0];
      const { white } = firstMatch;
      const winner = 'blue';

      const firstMatchUpdated: Match = {
        ...firstMatch,
        winner
      };

      const bracketsUpdated = updateBrackets(brackets as BracketsCategory, firstMatchUpdated);

      expect(bracketsUpdated.rounds[1].loser[0].white!.id).toBe(white!.id);
    }
  );

  it.each([[athletes.slice(0, 8)], [athletes.slice(0, 16)], [athletes]])(
    'should set loser second match',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatchWhite = brackets.rounds[0].winner[0];
      const firstMatchBlue = brackets.rounds[0].winner[1];
      const bracketsUpdatedFirstWhite = updateBrackets(brackets as BracketsCategory, {
        ...firstMatchWhite,
        winner: 'white'
      });
      const bracketsUpdatedFirstBlue = updateBrackets(bracketsUpdatedFirstWhite, {
        ...firstMatchBlue,
        winner: 'white'
      });

      const secondMatch = bracketsUpdatedFirstBlue.rounds[1].winner[0];
      const { white, blue } = secondMatch;
      const bracketsUpdated = updateBrackets(bracketsUpdatedFirstBlue, {
        ...secondMatch,
        winner: 'white'
      });

      const secondRoundUpdated = bracketsUpdated.rounds[1];
      const repechageMatch = secondRoundUpdated.repechage[secondRoundUpdated.repechage.length - 1];
      const repechageMatchInArray = bracketsUpdated.matches.find(
        (match) => match.id === repechageMatch.id
      );

      expect(bracketsUpdated.rounds[2].winner[0].white!.id).toBe(white!.id);
      expect(repechageMatch.white!.id).toBe(blue!.id);
      expect(repechageMatchInArray!.white!.id).toBe(blue!.id);
    }
  );
});

describe('updateLoserBrackets', () => {
  it.each([[athletes.slice(0, 8)], [athletes.slice(0, 16)], [athletes]])(
    'should send winner of loser round in repechage',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatchWhite = brackets.rounds[0].winner[0];
      const firstMatchBlue = brackets.rounds[0].winner[1];
      const bracketsUpdatedFirstWhite = updateBrackets(brackets as BracketsCategory, {
        ...firstMatchWhite,
        winner: 'white'
      });
      const bracketsUpdatedFirstBlue = updateBrackets(bracketsUpdatedFirstWhite, {
        ...firstMatchBlue,
        winner: 'white'
      });

      const white = firstMatchWhite.blue;
      const blue = firstMatchBlue.blue;
      const loserMatch = bracketsUpdatedFirstBlue.rounds[1].loser[0];
      const bracketsUpdated = updateBrackets(bracketsUpdatedFirstBlue, {
        ...loserMatch,
        winner: 'white'
      });

      const repechageInMatches = bracketsUpdated.matches.find(
        (match) => match.id === bracketsUpdated.rounds[1].repechage[0].id
      );

      expect(loserMatch.white!.id).toBe(white!.id);
      expect(loserMatch.blue!.id).toBe(blue!.id);
      expect(bracketsUpdated.rounds[1].loser[0].winner).toBe('white');
      expect(bracketsUpdated.rounds[1].repechage[0].blue!.id).toBe(white!.id);
      expect(repechageInMatches?.blue?.id).toBe(white!.id);
    }
  );

  it.each([[athletes.slice(0, 16)], [athletes]])(
    'should send winner of repechage round in next round loser',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatchWhite = brackets.rounds[0].winner[0];
      const firstMatchBlue = brackets.rounds[0].winner[1];
      const bracketsUpdatedFirstWhite = updateBrackets(brackets as BracketsCategory, {
        ...firstMatchWhite,
        winner: 'white'
      });
      const bracketsUpdatedFirstBlue = updateBrackets(bracketsUpdatedFirstWhite, {
        ...firstMatchBlue,
        winner: 'white'
      });

      const loserMatch = bracketsUpdatedFirstBlue.rounds[1].loser[0];
      const bracketsUpdatedLoser = updateBrackets(bracketsUpdatedFirstBlue, {
        ...loserMatch,
        winner: 'white'
      });

      const repechageMatch = bracketsUpdatedLoser.rounds[1].repechage[0];
      const { blue } = repechageMatch;
      const bracketsUpdated = updateBrackets(bracketsUpdatedLoser, {
        ...repechageMatch,
        winner: 'blue'
      });

      expect(bracketsUpdated.rounds[2].loser[0].white!.id).toBe(blue!.id);
      expect(bracketsUpdated.rounds[1].loser[0].id).toBe(loserMatch.id);
    }
  );
});

describe('update bye', () => {
  it.each([[athletes.slice(0, 5)], [athletes.slice(0, 9)], [athletes.slice(0, 17)]])(
    'should handle bye match in winner',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatch = brackets.rounds[0].winner[0];
      const { white, blue } = firstMatch;
      const winner = 'white';

      const firstMatchUpdated: Match = {
        ...firstMatch,
        winner
      };

      expect(blue).toBeUndefined();

      const bracketsUpdated = updateBrackets(brackets as BracketsCategory, firstMatchUpdated);

      expect(bracketsUpdated.rounds[1].winner[0].white!.id).toBe(white!.id);
      expect(bracketsUpdated.rounds[1].loser[0].blue).toBeUndefined();
    }
  );

  it.each([[athletes.slice(0, 5)], [athletes.slice(0, 9)], [athletes.slice(0, 17)]])(
    'should handle bye match in loser',
    (athleteSlice) => {
      const brackets = createBrackets('test', athleteSlice, 0);

      const firstMatch = brackets.rounds[0].winner[1];

      const bracketsFirstMatchUpdated = updateBrackets(brackets as BracketsCategory, {
        ...firstMatch,
        winner: 'blue'
      });

      const loserMatch = bracketsFirstMatchUpdated.rounds[1].loser[0];

      const bracketsUpdated = updateBrackets(bracketsFirstMatchUpdated, {
        ...loserMatch,
        winner: 'blue'
      });

      const repechageMatch = bracketsUpdated.rounds[1].repechage[0];

      expect(repechageMatch.blue!.id).toBe(loserMatch.blue!.id);
    }
  );

  it('should handle bye match in loser even if no match', () => {
    const brackets = createBrackets('test', athletes.slice(0, 5), 0);

    const firstMatch = brackets.rounds[0].winner[1];

    const bracketsFirstMatchUpdated = updateBrackets(brackets as BracketsCategory, {
      ...firstMatch,
      winner: 'blue'
    });

    const loserMatch = bracketsFirstMatchUpdated.rounds[1].loser[1];

    const bracketsUpdated = updateBrackets(bracketsFirstMatchUpdated, loserMatch);

    expect(bracketsUpdated.currentMatch).not.toBeUndefined();
    expect(bracketsUpdated.currentMatch).toBe(brackets.rounds[1].winner[0].id);
  });
});

describe('currentMatch', () => {
  it.each([
    [athletes.slice(0, 4)],
    [athletes.slice(0, 8)],
    [athletes.slice(0, 5)],
    [athletes.slice(0, 7)],
    [athletes.slice(0, 16)],
    [athletes.slice(0, 10)],
    [athletes.slice(0, 14)],
    [athletes],
    [athletes.slice(0, 19)],
    [athletes.slice(0, 24)]
  ])('should update currentMatch', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice, 0);
    const firstMatch = brackets.matches.find((match) => match.id === brackets.currentMatch);

    if (!firstMatch) {
      expect.fail("currentMatch can't be undefined");
    }

    const bracketsUpdated = updateBrackets(brackets as BracketsCategory, {
      ...firstMatch,
      winner: 'white'
    });

    expect(bracketsUpdated.currentMatch).not.toBeUndefined();
    expect(bracketsUpdated.currentMatch).toBe(brackets.matches[1].id);
  });

  it.each([
    [athletes.slice(0, 4)],
    [athletes.slice(0, 8)],
    [athletes.slice(0, 5)],
    [athletes.slice(0, 7)],
    [athletes.slice(0, 16)],
    [athletes.slice(0, 10)],
    [athletes.slice(0, 14)],
    [athletes],
    [athletes.slice(0, 19)],
    [athletes.slice(0, 24)]
  ])('should not get currentMatch because is last', (athleteSlice) => {
    const brackets = createBrackets('test', athleteSlice, 0);
    const lastMatch = brackets.matches[brackets.matches.length - 1];

    const currentMatch = getCurrentMatch(brackets.matches, lastMatch.id);

    expect(currentMatch).toBeUndefined();
  });
});
