const Dice = {
  Fire: {
    img: 'assets/dice/Fire.jpg',
    rgb: '#e73d09',
  },
  Frost: {
    img: 'assets/dice/Frost.jpg',
    rgb: '#10749d',
  },
  Light: {
    img: 'assets/dice/Light.jpg',
    rgb: '#6e5b43',
    blackText: true,
  },
  Shadow: {
    img: 'assets/dice/Shadow.jpg',
    rgb: '#190f2b',
  },
};

export default Dice;

export type DiceKey = keyof typeof Dice;
