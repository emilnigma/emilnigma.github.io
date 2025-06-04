import Store from '../Core/Store';

type IngredientAsset = Record<string, {
  img: string
  available: {value: number, cost: number}[]
  description: string
  instantEffect?: () => void
  condition?: () => boolean
  afterPickEffect?: () => void
}>;

const effectBase = () => {
  const store = Store.getInstance();
  const player = store.getDisplayPlayer();
  return { store, player };
};

const ingredients: IngredientAsset = {
  'Fire Lily': {
    img: 'assets/ingredients/fire_lily.jpg',
    available: [],
    description: 'Fire Lilies are volatile and highly flamable. Safely handling them earns you Gold, but using over seven will blow up your cauldron.',
    instantEffect: () => {
      const { player } = effectBase();
      player.changeCurrency({ gold: 1 });
    },
  },
  'Humble Carrot': {
    img: 'assets/ingredients/carrot.jpg',
    available: [{ value: 1, cost: 3 }],
    description: 'Carrots are not magic. Together with Mushrooms, however, they can quickly help to brew valuable potions.',
  },
  'Blue Trumpet Mushroom': {
    img: 'assets/ingredients/blue_trumpet_mushrooms.jpg',
    available: [{ value: 1, cost: 6 }, { value: 2, cost: 10 }, { value: 4, cost: 16 }],
    description: 'Mushrooms move an extra spot if there is a carrot in your cauldron. Two spots if there is three or more carrots.',
    instantEffect: () => {
      const { player } = effectBase();
      const carrots = player.chipsOnBoard.filter((c) => (c.chip.kind === 'Humble Carrot')).reduce((sum) => sum + 1, 0);
      const [mushroom] = player.getHighestChipOnBoard();
      if (carrots > 2) { mushroom.position += 2; return; }
      if (carrots > 0) { mushroom.position += 1; }
    },
  },
  'Clover Leaf': {
    img: 'assets/ingredients/clover_leaf.jpg',
    available: [{ value: 1, cost: 4 }, { value: 2, cost: 8 }, { value: 4, cost: 14 }],
    description: 'If you are lucky and the Clover Leaf is your penultimate or last Ingredient Card you receive an extra gem.',
    condition: () => {
      const { player } = effectBase();
      const highestChips = player.getHighestChipOnBoard();
      return highestChips[0].chip.kind === 'Clover Leaf'
       || (highestChips.length > 1 && highestChips[1].chip.kind === 'Clover Leaf');
    },
    afterPickEffect: () => {
      const { player } = effectBase();
      const highestChips = player.getHighestChipOnBoard();
      if (highestChips[0].chip.kind === 'Clover Leaf') player.changeCurrency({ emerald: 1 });
      if (highestChips.length > 1 && highestChips[1].chip.kind === 'Clover Leaf') player.changeCurrency({ emerald: 1 });
    },
  },
  'Sliverlake Seaweed': {
    img: 'assets/ingredients/sliverlake_seaweed.jpg',
    available: [{ value: 1, cost: 5 }, { value: 2, cost: 10 }, { value: 4, cost: 19 }],
    description: 'The seaweed found in Sliverlake holds magical water. The first occurence of seaweed refreshes your Dilution.',
    instantEffect: () => {
      const { player } = effectBase();
      const [, ...otherChips] = player.getHighestChipOnBoard();
      const alreadyHasSeaweed = otherChips.some(({ chip }) => chip.kind === 'Sliverlake Seaweed');
      if (player.effects.hasDilute || alreadyHasSeaweed) return;
      player.setProps({ effects: { hasDilute: true } });
    },
  },
  'Golden Fish Scale': {
    img: 'assets/ingredients/salmon.jpg',
    available: [{ value: 1, cost: 8 }, { value: 2, cost: 12 }, { value: 4, cost: 18 }],
    description: 'Shiny scales help you haggle with other merchants. Per scale you receive 30% off your next purchase.',
    instantEffect: () => {
      const { player } = effectBase();
      const { isHaggling = 0 } = player.effects;
      player.setProps({ effects: { isHaggling: isHaggling + 1 } });
    },
  },
  'Spider Silk': {
    img: 'assets/ingredients/spider_silk.jpg',
    available: [{ value: 1, cost: 9 }],
    description: 'Spider Silk has no effect (yet)',
  },
  'Winter Moth': {
    img: 'assets/ingredients/winter_moth.jpg',
    available: [{ value: 1, cost: 10 }],
    description: 'Winter Moths has no effect (yet)',
  },
};

export default ingredients;
