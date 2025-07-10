const Dice = {
  Fire: {
    img: 'assets/dice/Fire2.jpg',
    bg: 'assets/dice/FireBG.jpg',
    rgb: '#f75d19',
  },
  Frost: {
    img: 'assets/dice/Frost2.jpg',
    bg: 'assets/dice/FrostBG.jpg',
    rgb: '#3094bd',
  },
  Light: {
    img: 'assets/dice/Light2.jpg',
    bg: 'assets/dice/LightBG.jpg',
    rgb: '#6e5b43',
    blackText: true,
  },
  Shadow: {
    img: 'assets/dice/Shadow.jpg',
    bg: 'assets/dice/Shadow.jpg',
    rgb: '#190f2b',
  },
};

export default Dice;

export type DiceKey = keyof typeof Dice;
