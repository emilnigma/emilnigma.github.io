/* eslint-disable no-use-before-define */
import { action, makeObservable, observable } from 'mobx';
import { createContext, createRef, useContext } from 'react';
import Player from '../Components/Player/Player';
import ingredients from '../Assets/Ingredients';
import { IngredientProps } from '../Components/Board/Ingredient';
import UiStore from './UiStore';
import { clamp, randomBetween } from './Random';

export type Settings = {
  rounds: number,
  ingredients: (keyof typeof ingredients)[]
  startDeck: IngredientProps[]
};

export type Tooltip = 'none' | 'progress' | 'capacity' | 'stability';

export default class Store {
  // Singleton
  private static instance: Store;
  public static readonly getInstance = () => {
    if (this.instance === undefined) {
      this.instance = new Store();
    }
    return this.instance;
  };

  ui = new UiStore();

  public player: Player = new Player(this);

  level = 1;
  levelSet = (level: number) => {
    this.level = level;
  };

  tooltip = 'progress';
  tooltipSet = (tooltip: Tooltip) => {
    this.tooltip = tooltip;
  };

  scoreRef = createRef();
  currencyRef = createRef();
  gemRef = createRef();

  rollTheme = ['Light', 'Shadow'];
  rollLeft = 0;
  rollLeftMax = 6;
  rollRight = 0;
  rollRightMax = 6;
  rollSet = () => {
    this.rollLeft = randomBetween(1, this.rollLeftMax);
    this.rollRight = randomBetween(1, this.rollRightMax);
    return [this.rollLeft, this.rollRight];
  };

  progress = 0;
  progressMax = 4;
  progressSet = (progress: number) => {
    this.progress = clamp(progress, 0, this.progressMax);
  };

  capacity = 0;
  capacityMax = 9;
  capacityIsVisible = () => this.level !== 1 || this.progress > 1;
  capacitySet = (capacity: number) => {
    this.capacity = clamp(capacity, 0, this.capacityMax);
  };

  stability = 0;
  stabilityRightBound = -8;
  stabilityLeftBound = 8;
  stabilityRightMax = -10;
  stabilityLeftMax = 10;
  stabilityIsVisible = () => this.level !== 1 || (this.progress > 1 && this.capacity > 3);
  stabilitySet = (stability: number) => {
    this.stability = clamp(stability, this.stabilityRightMax, this.stabilityLeftMax);
  };

  quality = [0, 0, 0];
  qualitySet = () => {
    const [g, s, c] = this.quality;
    const quality = g * 10000 + s * 100 + c + this.capacity * 199 - Math.abs(this.stability * 24);
    const qualityCopper = quality % 100;
    const qualitySilver = Math.floor((quality % 10000) / 100);
    const qualityGold = Math.floor(quality / 10000);
    this.quality = [qualityGold, qualitySilver, qualityCopper];
  };

  addIngredient = () => {
    const [l, r] = this.rollSet();
    if (l >= r) this.progressSet(this.progress + 1);
    if (this.capacityIsVisible()) this.capacitySet(this.capacity + 1);
    if (this.stabilityIsVisible()) this.stabilitySet(this.stability + l - r);
    this.qualitySet();
  };

  constructor() {
    makeObservable(this, {
      level: observable,
      levelSet: action,

      tooltip: observable,
      tooltipSet: action,

      rollLeft: observable,
      rollRight: observable,
      rollSet: action,

      progress: observable,
      progressSet: action,

      capacity: observable,
      capacitySet: action,

      stability: observable,
      stabilitySet: action,
    });
  }
};

export const StoreContext = createContext(Store.getInstance());
export const useStore = () => useContext(StoreContext);
