export const getRandomElement = <T>(array: Array<T>) =>
  array.length !== 0 ? array[Math.floor(Math.random() * array.length)] : undefined;
