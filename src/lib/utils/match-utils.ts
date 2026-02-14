export function getRandomElement<T>(array: T[]) {
  return array.length !== 0
    ? array[Math.floor(Math.random() * array.length)]
    : undefined;
}
