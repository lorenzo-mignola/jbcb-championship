import { T } from 'ramda';

import type { Judoka } from '$lib/types/judoka.type';
import type { Match } from '$lib/types/match.type';
import type { Rounds } from '$lib/types/rounds.type';

import { getRandomElement } from '../../../utils/match-utils';
import { createMatch } from '../../match';
import { removeAthlete } from './remove-athlete';

function pickAthlete(
  athletesNotPicket: (Judoka | undefined)[],
  otherAthleteClub?: string,
) {
  const filterFn = otherAthleteClub
    ? (athlete: Judoka | undefined) => athlete?.club !== otherAthleteClub
    : undefined;
  const athletesToPick = athletesNotPicket.filter(filterFn ?? T);
  const athlete = getRandomElement(
    athletesToPick.length < 2 ? athletesNotPicket : athletesToPick,
  );
  const remain = removeAthlete(athletesNotPicket)(athlete);
  return { athlete, remain };
}

export function getMatches(rounds: Rounds) {
  return rounds
    .flatMap(({ loser, repechage, winner }) => [loser, winner, repechage])
    .flat();
}

function getEvenOrOddMatches(matchInRound: number) {
  return (athletes: (Judoka | undefined)[] | undefined) => {
    const matches: Match[] = [];
    let athletesNotPicket = athletes;
    for (let index = 0; index < matchInRound / 2; index++) {
      if (!athletes || !athletesNotPicket) {
        matches.push(createMatch());
        continue;
      }

      if (athletesNotPicket.length === 0) {
        break;
      }

      const { athlete: white, remain: remainAthletesNotPicketAfterWhite }
        = pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterWhite;

      const { athlete: blue, remain: remainAthletesNotPicketAfterBlue }
        = pickAthlete(athletesNotPicket, white?.club);
      athletesNotPicket = remainAthletesNotPicketAfterBlue;

      matches.push(createMatch(white, blue));
    }
    return {
      athletesNotPicket,
      matches,
    };
  };
}

export function createMatches(matchInRound: number) {
  return (
    athletes?: (Judoka | undefined)[],
    byeAthletes?: (Judoka | undefined)[],
  ) =>
    () => {
      const { athletesNotPicket, matches: oddMatches }
        = getEvenOrOddMatches(matchInRound)(athletes);
      const { matches: evenMatches }
        = getEvenOrOddMatches(matchInRound)(athletesNotPicket);

      const matches = [];
      let byeNotPicked = byeAthletes ?? [];
      for (let index = 0; index < matchInRound; index++) {
        const even = index % 2 === 0;
        const indexInArray = Math.floor(index / 2);
        const match = even
          ? evenMatches[indexInArray]
          : oddMatches[indexInArray];
        if (!match) {
          const { athlete: byeAthlete, remain: byeRemain }
            = pickAthlete(byeNotPicked);
          byeNotPicked = byeRemain;
          matches.push(createMatch(byeAthlete, undefined));
          continue;
        }

        matches.push(
          even ? evenMatches[indexInArray] : oddMatches[indexInArray],
        );
      }

      return matches;
    };
}
