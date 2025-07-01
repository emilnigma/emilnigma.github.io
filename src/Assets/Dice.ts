const Dice = {
  Fire: { rgb: '#e73d09' },
  Frost: { rgb: '#10749d' },
};

export default Dice;

export type DiceKey = keyof typeof Dice;
