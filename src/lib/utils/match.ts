export const getRandomElement = <T>(array: T[]) =>
  array.length !== 0 ? array[Math.floor(Math.random() * array.length)] : undefined;
