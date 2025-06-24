import { action, makeObservable, observable } from 'mobx';
import { IngredientProps } from '../Board/Ingredient';
import {
  goldAt, potionAt, emeraldAt, scorePointsAt,
  rubyAt,
} from '../../Assets/BoardPositions';
import { randomIndex, shuffle } from '../../Core/Random';
import { PhaseNumber } from '../../Assets/Phases';
import ingredients from '../../Assets/Ingredients';
import players from '../../Assets/Players';

export const initialCurrency = {
  gold: 0,
  emerald: 1,
  ruby: 0,
  sapphire: 0,
  topaz: 0,
};

type Effects = Partial<{
  isHaggling: number
  hasDilute: boolean
  fireResistance: number // todo
}>;

export interface PlayerProps {
  character: number;
  chipsInBag: IngredientProps[];
  chipsInShoppingCart: (IngredientProps | string)[];
  chipsOnBoard: {position: number, chip: IngredientProps}[];
  phase: PhaseNumber;
  effects: Effects
}

export interface PlayerStats {
  startingPosition: number
  score: number
  currency: typeof initialCurrency
  potion: number
}

export default class Player implements PlayerProps, PlayerStats {
  // character
  character: number;

  // game
  chipsInBag: IngredientProps[];
  chipsInShoppingCart: (IngredientProps | string)[];
  chipsOnBoard: {position: number, chip: IngredientProps}[];
  phase: PhaseNumber;

  // stats
  startingPosition: number;
  score: number;
  currency: typeof initialCurrency;
  potion: number;
  effects: Effects;

  constructor() {
    this.character = randomIndex(players);
    this.chipsInBag = []; // shuffle(store.settings.startDeck);
    this.chipsOnBoard = [];
    this.chipsInShoppingCart = [];
    this.startingPosition = 0;
    this.score = 1;
    this.currency = initialCurrency;
    this.phase = 1;
    this.potion = 1;
    this.effects = {
      isHaggling: 0,
      hasDilute: true,
      fireResistance: 7,
    };

    makeObservable(this, {
      startingPosition: observable,
      score: observable,
      currency: observable,
      setStat: action,

      effects: observable,
      setProps: action,

      phase: observable,
      advancePhase: action,

      chipsInBag: observable,
      chipsOnBoard: observable,
      pickChip: action,
      dilute: action,

      chipsInShoppingCart: observable,
      addToCart: action,
      exitShop: action,
    });
  }

  setProps = (props: Partial<PlayerProps>) => {
    const { effects } = props;
    this.effects = { ...this.effects, ...effects };
  };

  setStat = (stats: Partial<PlayerStats>) => {
    const {
      startingPosition, score, currency, potion,
    } = stats;
    this.startingPosition = startingPosition !== undefined ? startingPosition : this.startingPosition;
    this.score = score ?? this.score;
    this.currency = currency ?? this.currency;
    this.potion = potion ?? this.potion;
  };

  getHighestChipOnBoard = () => [...this.chipsOnBoard].sort(({ position: p1 }, { position: p2 }) => p2 - p1);

  getChipOnBoard = (queryPosition: number) => this.chipsOnBoard.find(({ position }) => position === queryPosition);

  dilute = () => {
    const [{ position: p1, chip }] = this.getHighestChipOnBoard();
    this.chipsOnBoard = this.chipsOnBoard.filter(({ position: p2 }) => p1 !== p2);
    this.chipsInBag.push(chip);
    this.setProps({ effects: { hasDilute: false } });
  };

  pickChip = () => {
    if (this.chipsInBag.length === 0) return;
    const index = randomIndex(this.chipsInBag);
    const chip = this.chipsInBag[index];
    this.chipsInBag = [...this.chipsInBag.slice(0, index), ...this.chipsInBag.slice(index + 1)];

    const [prevChip] = this.getHighestChipOnBoard();
    const position = prevChip ? prevChip.position : -1;
    if (position >= 52) {
      this.createPotion();
    } else {
      this.chipsOnBoard.push({ position: position + 1, chip });
    }

    const { instantEffect } = ingredients[chip.kind];
    if (instantEffect !== undefined) instantEffect();
  };

  createPotion = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.setStat({ potion: potionAt(position) });
    this.advancePhase();
  };

  changeCurrency = (currency: Partial<typeof initialCurrency>) => {
    const merge: typeof initialCurrency = {
      gold: this.currency.gold + (currency.gold ?? 0),
      emerald: this.currency.emerald + (currency.emerald ?? 0),
      ruby: this.currency.ruby + (currency.ruby ?? 0),
      sapphire: this.currency.sapphire + (currency.sapphire ?? 0),
      topaz: this.currency.topaz + (currency.topaz ?? 0),
    };
    this.setStat({ currency: merge });
  };

  claimScore = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.setStat({
      score: this.score + scorePointsAt(position),
    });
  };

  claimCurrency = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.changeCurrency({ gold: goldAt(position) });
  };

  claimGems = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.changeCurrency({
      emerald: emeraldAt(position) ? 1 : 0,
      ruby: rubyAt(position) ? 1 : 0,
    });
  };

  addToCart = (ingredient: IngredientProps | string) => {
    this.chipsInShoppingCart = [...this.chipsInShoppingCart, ingredient];
  };

  exitShop = () => {
    this.chipsInBag = [...this.chipsInBag, ...this.chipsInShoppingCart.filter((s) => typeof s !== 'string')] as IngredientProps[];
    this.chipsInShoppingCart = [];
    this.advancePhase();
  };

  advancePhase = () => {
    this.phase += 1;
  };

  resetForRound = () => {
    const chips = this.chipsOnBoard.map(({ chip }) => chip);
    this.chipsInBag = shuffle([...chips, ...this.chipsInBag]);
    this.chipsOnBoard = [];
    this.phase = 1;
  };
};
