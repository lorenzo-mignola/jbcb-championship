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

const getEvenOrOddMatches =
  (matchInRound: number) => (athletes: (Judoka | undefined)[] | undefined) => {
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

      const { athlete: white, remain: remainAthletesNotPicketAfterWhite } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterWhite;

      const { athlete: blue, remain: remainAthletesNotPicketAfterBlue } =
        pickAthlete(athletesNotPicket);
      athletesNotPicket = remainAthletesNotPicketAfterBlue;

      matches.push(createMatch(white, blue));
    }
    return {
      matches,
      athletesNotPicket
    };
  };

export const createMatches =
  (matchInRound: number) =>
  (athletes?: (Judoka | undefined)[], byeAthletes?: (Judoka | undefined)[]) =>
  () => {
    const { matches: evenMatches, athletesNotPicket } = getEvenOrOddMatches(matchInRound)(athletes);
    const { matches: oddMatches } = getEvenOrOddMatches(matchInRound)(athletesNotPicket);

    const matches = [];
    let byeNotPicked = byeAthletes ?? [];
    for (let index = 0; index < matchInRound; index++) {
      const even = index % 2 === 0;
      const indexInArray = Math.floor(index / 2);
      const athlete = even ? evenMatches[indexInArray] : oddMatches[indexInArray];
      if (!athlete) {
        const { athlete: byeAthlete, remain: byeRemain } = pickAthlete(byeNotPicked);
        byeNotPicked = byeRemain;
        matches.push(createMatch(byeAthlete, undefined));
        continue;
      }

      matches.push(even ? evenMatches[indexInArray] : oddMatches[indexInArray]);
    }

    return matches;
  };
