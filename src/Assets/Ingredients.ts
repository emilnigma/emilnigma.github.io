import Store from '../Core/Store';

type IngredientAsset = Record<string, {
  img: string
  description: string
  instantEffect?: () => void
}>;

const ingredients: IngredientAsset = {
  'Inert Potato': {
    img: 'assets/ingredients/carrot.jpg',
    description: 'Carrots are not magic. Together with Mushrooms, however, they can quickly help to brew valuable potions.',
  },
  'Fire Lily': {
    img: 'assets/ingredients/fire_lily.jpg',
    description: 'Fire Lilies are volatile and highly flamable. Safely handling them earns you Gold, but using over seven will blow up your cauldron.',
    instantEffect: () => {
      const {
        progress, progressSet,
        capacity, capacitySet,
      } = Store.getInstance();
      progressSet(progress + 1);
      capacitySet(capacity + 3);
    },
  },
  'Blue Trumpet Mushroom': {
    img: 'assets/ingredients/blue_trumpet_mushrooms.jpg',
    description: 'Mushrooms move an extra spot if there is a carrot in your cauldron. Two spots if there is three or more carrots.',
    instantEffect: () => {
      const { stability, stabilitySet } = Store.getInstance();
      stabilitySet(stability + 2);
    },
  },
  'Clover Leaf': {
    img: 'assets/ingredients/clover_leaf.jpg',
    description: 'If you are lucky and the Clover Leaf is your penultimate or last Ingredient Card you receive an extra gem.',
    // condition: () => {
    //   // const { player } = effectBase();
    //   // const highestChips = player.getHighestChipOnBoard();
    //   // return highestChips[0].chip.kind === 'Clover Leaf'
    //   //  || (highestChips.length > 1 && highestChips[1].chip.kind === 'Clover Leaf');
    // },
  },
  'Sliverlake Seaweed': {
    img: 'assets/ingredients/sliverlake_seaweed.jpg',
    description: 'The seaweed found in Sliverlake holds magical water. The first occurence of seaweed refreshes your Dilution.',
    instantEffect: () => {
      // const { player } = effectBase();
      // const [, ...otherChips] = player.getHighestChipOnBoard();
      // const alreadyHasSeaweed = otherChips.some(({ chip }) => chip.kind === 'Sliverlake Seaweed');
      // if (player.effects.hasDilute || alreadyHasSeaweed) return;
      // player.setProps({ effects: { hasDilute: true } });
    },
  },
  'Golden Fish Scale': {
    img: 'assets/ingredients/salmon.jpg',
    description: 'Shiny scales help you haggle with other merchants. Per scale you receive 30% off your next purchase.',
    instantEffect: () => {
      // const { player } = effectBase();
      // const { isHaggling = 0 } = player.effects;
      // player.setProps({ effects: { isHaggling: isHaggling + 1 } });
    },
  },
  'Spider Silk': {
    img: 'assets/ingredients/spider_silk.jpg',
    description: 'Spider Silk has no effect (yet)',
  },
  'Winter Moth': {
    img: 'assets/ingredients/winter_moth.jpg',
    description: 'Winter Moths has no effect (yet)',
  },
};

export default ingredients;
