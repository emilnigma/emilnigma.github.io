import { DiceKey } from './Dice';

export type LevelProps = {
    theme: DiceKey[]
    max: number[]
};

const Levels = {
  'Minor Speed Potion': {
    theme: ['Fire', 'Frost'],
    max: [5, 5],
  },
  'Lesser Healing Potion': {
    theme: ['Light', 'Shadow'],
    max: [6, 6],
  },
};

export default Levels;

export type LevelKey = keyof typeof Levels;
