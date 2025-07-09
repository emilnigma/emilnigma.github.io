/* eslint-disable no-use-before-define */
import { action, makeObservable, observable } from 'mobx';
import { createContext, createRef, useContext } from 'react';
import { clamp, randomBetween } from './Random';
import { Page } from '../Components/Main/Game';
import { DiceKey } from '../Assets/Dice';
import Levels, { LevelKey } from '../Assets/Levels';

export type Tooltip = 'none' | 'progress' | 'capacity' | 'stability';

const [tutorialLevel] = Object.keys(Levels);

export default class Store {
  // Singleton
  private static instance: Store;
  public static readonly getInstance = () => {
    if (this.instance === undefined) {
      this.instance = new Store();
    }
    return this.instance;
  };

  page: Page = 'start';
  pageSet = (page: Page) => {
    this.page = page;
  };

  level: LevelKey | undefined = undefined;
  levelSet = (level: string) => {
    if (!Object.keys(Levels).includes(level)) {
      console.error(`${level} is not a valid level.`);
      return;
    }
    this.page = 'brew';
    this.level = level as LevelKey;
    this.rollTheme = Levels[level as LevelKey].theme as DiceKey[];
    this.progress = 0;
    this.capacity = 0;
    this.stability = 0;
  };

  tooltip = 'none';
  tooltipSet = (tooltip: Tooltip) => {
    this.tooltip = tooltip;
  };

  scoreRef = createRef();
  currencyRef = createRef();
  gemRef = createRef();

  rollTheme: DiceKey[] = ['Fire', 'Frost'];
  rollValue: (number | undefined)[] = [undefined, undefined];
  rollLeft: number | undefined = undefined;
  rollLeftMax = 6;
  rollRight: number | undefined = undefined;
  rollRightMax = 6;
  rollSet = ([rollLeft, rollRight]: (number)[]) => {
    this.rollLeft = rollLeft;
    this.rollRight = rollRight;
    if (this.rollLeft !== undefined && this.rollRight !== undefined && this.rollLeft >= this.rollRight) this.progressSet(this.progress + 1);
    if (this.capacityIsVisible()) this.capacitySet(this.capacity + 1);
    if (this.stabilityIsVisible()) this.stabilitySet(this.stability + (this.rollLeft ?? 0) - (this.rollRight ?? 0));
  };
  rollReset = () => {
    this.rollLeft = undefined;
    this.rollRight = undefined;
  };
  startAnim = () => {
    this.rollReset();
    setTimeout(() => {
      this.rollSet([randomBetween(1, 6), randomBetween(1, 6)]);
      console.log(this.rollLeft, this.rollRight);
      this.qualitySet();
    }, 500);
  };

  progress = 0;
  progressMax = 4;
  progressLastChange = undefined;
  progressSet = (progress: number) => {
    this.progress = clamp(progress, 0, this.progressMax);
  };
  progressIsDone = () => this.progress === this.progressMax;

  capacity = 0;
  capacityMax = 9;
  capacityLastChange = undefined;
  capacityIsVisible = () => this.level !== tutorialLevel || this.progress > 0;
  capacitySet = (capacity: number) => {
    if (!this.capacityIsVisible()) return;
    this.capacity = Math.max(0, capacity);
  };
  capacityIsFail = () => this.capacity >= this.capacityMax && !this.progressIsDone();

  stability = 0;
  stabilityRightBound = -8;
  stabilityLeftBound = 8;
  stabilityRightMax = -10;
  stabilityLeftMax = 10;
  stabilityLastChange = undefined;
  stabilityIsVisible = () => this.level !== tutorialLevel || this.progress > 1;
  stabilitySet = (stability: number) => {
    if (!this.stabilityIsVisible()) return;
    this.stability = clamp(stability, this.stabilityRightMax, this.stabilityLeftMax);
  };
  stabilityIsFail = () => this.stability > this.stabilityLeftBound && this.stability < this.stabilityRightBound;

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
    // const [l, r] = this.rollSet();
    // if (l >= r) this.progressSet(this.progress + 1);
    // if (this.capacityIsVisible()) this.capacitySet(this.capacity + 1);
    // if (this.stabilityIsVisible()) this.stabilitySet(this.stability + l - r);
    this.qualitySet();
  };

  constructor() {
    makeObservable(this, {
      page: observable,
      pageSet: action,

      level: observable,
      levelSet: action,

      tooltip: observable,
      tooltipSet: action,

      rollLeft: observable,
      rollRight: observable,
      rollSet: action,
      rollReset: action,

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
