import type { Rounds } from '../../../types/Category';
import type { Judoka } from '../../../types/Judoka';
import type { Match } from '../../../types/Match';
import { getRandomElement } from '../../../utils/match';
import { createMatch } from '../../match';
import { removeAthlete } from './removeAthlete';

const pickAthlete = (athletesNotPicket: (Judoka | undefined)[]) => {
  const athlete = getRandomElement(athletesNotPicket);
  const remain = removeAthlete(athletesNotPicket)(athlete);
  return { athlete, remain };
};

export const getMatches = (rounds: Rounds) =>
  rounds.flatMap(({ loser, winner, repechage }) => [loser, winner, repechage]).flat();

export const createMatches =
  (matchInRound: number) =>
  (athletes?: (Judoka | undefined)[], byeAthletes?: (Judoka | undefined)[]) =>
  () => {
    const matches: Match[] = [];
    let athletesNotPicket = athletes;
    for (let index = 0; index < matchInRound; index++) {
      if (!athletes || !athletesNotPicket) {
        matches.push(createMatch());
        continue;
      }

      if (athletesNotPicket.length === 0) {
        break;
      }

      const { athlete: white, remain: remainAthletesNotPicketAfterWhite } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterWhite;

      const { athlete: blue, remain: remainAthletesNotPicketAfterBlue } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterBlue;

      matches.push(createMatch(white, blue));
    }

    // add bye match
    byeAthletes?.forEach((athlete) => {
      matches.push(createMatch(athlete, undefined));
    });
    return matches;
  };
