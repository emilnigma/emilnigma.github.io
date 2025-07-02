const Dice = {
  Fire: { img: 'assets/dice/Fire.jpg', rgb: '#e73d09' },
  Frost: { img: 'assets/dice/Frost.jpg', rgb: '#10749d' },
  Light: { img: 'assets/dice/Light.jpg', rgb: '#10749d' },
  Shadow: { img: 'assets/dice/Shadow.jpg', rgb: '#10749d' },
};

export default Dice;

export type DiceKey = keyof typeof Dice;
