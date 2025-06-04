export const randomBetween = (from: number, to: number) => Math.floor(Math.random() * (to - from + 1)) + from;
export const randomIndex = (array: Array<any>) => randomBetween(0, array.length - 1);
export const randomItem = <T>(array: Array<T>) => array[randomIndex(array)];
export const shuffle = (unshuffled: any[]) => [...unshuffled]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
