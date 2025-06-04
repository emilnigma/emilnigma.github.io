// all positions
export const boardPositions = Array.from(new Array(54), (_, i) => i);

// score
export const scorePointIncrements = [
  6, 10, 14, 18, 22, 26, 29, 32, 35, 38, 41, 44, 48, 51, 53,
];
export const scorePointsAt = (i: number) => scorePointIncrements
  .filter((s) => s <= i)
  .reduce((sum) => sum + 1, 0);

// gold
export const goldIncrements = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51,
  53, 53,
];
export const goldAt = (i: number) => goldIncrements
  .filter((s) => s <= i)
  .reduce((sum) => sum + 1, 0);

// gem: emerald
export const emeraldPositions = [
  5, 9, 13, 16, 20,
];
export const emeraldAt = (i: number) => emeraldPositions.includes(i);

// gem: ruby
export const rubyPositions = [
  24, 28, 30, 34,
];
export const rubyAt = (i: number) => rubyPositions.includes(i);

// gem: sapphire
export const sapphirePositions = [
  36, 40, 42,
];
export const sapphireAt = (i: number) => sapphirePositions.includes(i);

// gem: topaz
export const topazPositions = [
  46, 50, 52,
];
export const topazAt = (i: number) => topazPositions.includes(i);

// potions
export const potionIncrements = [
  0, 4, 7, 11, 14, 18, 21, 24, 28, 31, 35, 38, 41, 44,
];
export const potionAt = (i: number) => potionIncrements
  .filter((s) => s <= i)
  .reduce((sum) => sum + 1, 0);
