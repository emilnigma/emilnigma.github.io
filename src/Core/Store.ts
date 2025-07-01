/* eslint-disable no-use-before-define */
import { action, makeObservable, observable } from 'mobx';
import { createContext, createRef, useContext } from 'react';
import { clamp, randomBetween } from './Random';
import { Page } from '../Components/Main/Game';
import { juice } from './Juice';
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

  tooltip = 'progress';
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
  rollSet = ([rollLeft, rollRight]: (number | undefined)[]) => {
    this.rollLeft = rollLeft;
    this.rollRight = rollRight;
  };
  rollReset = () => {
    this.rollLeft = undefined;
    this.rollRight = undefined;
  };
  startAnim = () => {
    this.rollReset();
    let speed = -150;
    let anim = 0;
    const frame = () => {
      anim = setTimeout(() => {
        this.rollSet([randomBetween(1, 6), randomBetween(1, 6)]);
        speed += 10;
        frame();
      }, Math.max(15, Math.abs(speed)));
    };
    frame();
    setTimeout(() => {
      clearTimeout(anim);
      juice('rollLeft', 'testJuice');
      juice('rollRight', 'testJuice');
      if (this.rollLeft !== undefined && this.rollRight !== undefined && this.rollLeft >= this.rollRight) this.progressSet(this.progress + 1);
      if (this.capacityIsVisible()) this.capacitySet(this.capacity + 1);
      if (this.stabilityIsVisible()) this.stabilitySet(this.stability + (this.rollLeft ?? 0) - (this.rollRight ?? 0));
      this.qualitySet();
    }, 5000);
  };

  progress = 0;
  progressMax = 4;
  progressSet = (progress: number) => {
    this.progress = clamp(progress, 0, this.progressMax);
  };

  capacity = 0;
  capacityMax = 9;
  capacityIsVisible = () => this.level !== tutorialLevel || this.progress > 1;
  capacitySet = (capacity: number) => {
    this.capacity = clamp(capacity, 0, this.capacityMax);
  };

  stability = 0;
  stabilityRightBound = -8;
  stabilityLeftBound = 8;
  stabilityRightMax = -10;
  stabilityLeftMax = 10;
  stabilityIsVisible = () => this.level !== tutorialLevel || (this.progress > 1 && this.capacity > 3);
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
