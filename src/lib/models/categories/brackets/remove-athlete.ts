import type { Judoka } from '../../../types/judoka.type';

export function removeAthlete<T extends Judoka | undefined>(notPicket: T[]) {
  return (whiteOrBlue: Judoka | undefined) => {
    if (!whiteOrBlue) {
      const undefinedAthletes = notPicket.filter(
        athlete => athlete === undefined,
      );
      const notUndefinedAthletes = notPicket.filter(
        athlete => athlete !== undefined,
      );
      undefinedAthletes.pop();
      return [...notUndefinedAthletes, ...undefinedAthletes];
    }

    return notPicket.filter(athlete => athlete?.id !== whiteOrBlue.id);
  };
}
