const PATH = 'assets/potions/';

type PotionInfo = {img: string, description: string}[];

const potions: PotionInfo = [
  {
    img: `${PATH}burnt_experiment.png`,
    description: 'You scrape the cauldron and try to sell your burnt experiment.',
  },
  {
    img: `${PATH}red_potion.png`,
    description: 'You brewed a common red potion.',
  },
  {
    img: `${PATH}blue_potion.png`,
    description: 'You brewed a simple blue potion.',
  },
  {
    img: `${PATH}snow_draught.png`,
    description: 'You brewed a common snow draught.',
  },
  {
    img: `${PATH}unholy_brew.png`,
    description: 'After the foam clears you extract an unholy brew.',
  },
  {
    img: `${PATH}midnight_nectar.png`,
    description: 'The thick nectar reflects light like the surface of the moon.',
  },
  {
    img: `${PATH}fertile_concoction.png`,
    description: 'You created a fertile concoction.',
  },
  {
    img: `${PATH}lovers_potion.png`,
    description: 'The resulting love potion gives off a seductive smell.',
  },
  {
    img: `${PATH}fiery_oil.png`,
    description: 'You expertly bottle the volatile fiery oil.',
  },
  {
    img: `${PATH}liquid_luck.png`,
    description: 'Congratulations! You brewed liquid luck.',
  },
  {
    img: `${PATH}health_potion.png`,
    description: 'You managed to create the sought after health potion.',
  },
  {
    img: `${PATH}vicious_elixir.png`,
    description: 'The side effects of this vicious elixir are unclear at this time.',
  },
  {
    img: `${PATH}stargazers_potion.png`,
    description: 'A stargazers potion gives the consumer cosmic visions.',
  },
];

export default potions;
