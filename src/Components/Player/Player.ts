import { action, makeObservable, observable } from 'mobx';
import { IngredientProps } from '../Board/Ingredient';
import { Settings } from '../../Core/Store';
import {
  currencyPointsAt, potionAt, rubyAt, scorePointsAt,
} from '../../Assets/BoardPositions';
import { randomIndex, shuffle } from '../../Core/Random';
import { PhaseNumber } from '../../Assets/Phases';
import ingredients from '../../Assets/Ingredients';

type Effects = Partial<{
  isHaggling: number
  hasDilute: boolean
  fireResistance: number // todo
}>;

interface PlayerStats {
  startingPosition: number
  score: number
  currency: number
  rubies: number
  potion: number
  effects: Effects
}

export default class Player implements PlayerStats {
  // character
  name: string;
  character: number;

  // game
  chipsInBag: IngredientProps[];
  chipsInShoppingCart: (IngredientProps | string)[];
  chipsOnBoard: {position: number, chip: IngredientProps}[];
  startingPosition: number;
  score: number;
  currency: number;
  rubies: number;
  phase: PhaseNumber;
  potion: number;
  effects: Effects;

  constructor(name: string, character: number, settings: Settings) {
    this.name = name;
    this.character = character;
    this.chipsInBag = shuffle(settings.startDeck);
    this.chipsOnBoard = [];
    this.chipsInShoppingCart = [];
    this.startingPosition = 0;
    this.score = 1;
    this.currency = 0;
    this.rubies = 1;
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
      rubies: observable,
      effects: observable,
      setStat: action,

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

  setStat = (stats: Partial<PlayerStats>) => {
    const {
      startingPosition, score, currency, rubies, potion, effects,
    } = stats;
    this.startingPosition = startingPosition !== undefined ? startingPosition : this.startingPosition;
    this.score = score ?? this.score;
    this.currency = currency ?? this.currency;
    this.rubies = rubies ?? this.rubies;
    this.potion = potion ?? this.potion;
    this.effects = effects !== undefined ? { ...this.effects, ...effects } : this.effects;
  };

  getHighestChipOnBoard = () => [...this.chipsOnBoard].sort(({ position: p1 }, { position: p2 }) => p2 - p1);

  getChipOnBoard = (queryPosition: number) => this.chipsOnBoard.find(({ position }) => position === queryPosition);

  dilute = () => {
    const [{ position: p1, chip }] = this.getHighestChipOnBoard();
    this.chipsOnBoard = this.chipsOnBoard.filter(({ position: p2 }) => p1 !== p2);
    this.chipsInBag.push(chip);
    this.setStat({ effects: { hasDilute: false } });
  };

  pickChip = () => {
    if (this.chipsInBag.length === 0) return;
    const index = randomIndex(this.chipsInBag);
    const chip = this.chipsInBag[index];
    this.chipsInBag = [...this.chipsInBag.slice(0, index), ...this.chipsInBag.slice(index + 1)];

    const [prevChip] = this.getHighestChipOnBoard();
    const position = prevChip ? prevChip.position : this.startingPosition;
    if (position >= 52) {
      this.createPotion();
    } else {
      this.chipsOnBoard.push({ position: position + chip.value, chip });
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

  claimScore = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.setStat({ score: this.score + scorePointsAt(position) });
  };

  claimCurrency = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.setStat({ currency: this.currency + currencyPointsAt(position) });
  };

  claimRuby = () => {
    const [highestChip] = this.getHighestChipOnBoard();
    const position = highestChip.position + 1;
    this.setStat({ rubies: this.rubies + (rubyAt(position) ? 1 : 0) });
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
