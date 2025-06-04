/* eslint-disable no-use-before-define */
import { action, makeObservable, observable } from 'mobx';
import { createContext, createRef, useContext } from 'react';
import Player from '../Components/Player/Player';
import ingredients from '../Assets/Ingredients';
import { IngredientProps } from '../Components/Board/Ingredient';

export type Settings = {
  rounds: number,
  ingredients: (keyof typeof ingredients)[]
  startDeck: IngredientProps[]
};

export default class Store {
  // Singleton
  private static instance: Store;
  public static readonly getInstance = () => {
    if (this.instance === undefined) {
      this.instance = new Store();
    }
    return this.instance;
  };

  public settings: Settings = {
    rounds: 9,
    ingredients: [],
    startDeck: [
      { kind: 'Fire Lily', value: 1 },
      { kind: 'Fire Lily', value: 1 },
      { kind: 'Fire Lily', value: 1 },
      { kind: 'Fire Lily', value: 1 },
      { kind: 'Fire Lily', value: 2 },
      { kind: 'Fire Lily', value: 2 },
      { kind: 'Fire Lily', value: 3 },
      { kind: 'Humble Carrot', value: 1 },
      { kind: 'Clover Leaf', value: 1 },
    ],
  };
  public setSettings = (settings: Partial<Settings>) => {
    this.settings = { ...this.settings, ...settings };
  };

  public player: Player = new Player(this);
  public startGame = () => {
    this.round = 1;
  };

  public round = 0;
  public startNewRound = () => {
    this.player.resetForRound();
    this.round += 1;
  };

  scoreRef = createRef();
  currencyRef = createRef();
  gemRef = createRef();

  constructor() {
    makeObservable(this, {
      settings: observable,
      setSettings: action,
      round: observable,
      startGame: action,
    });
  }
};

export const StoreContext = createContext(Store.getInstance());
export const useStore = () => useContext(StoreContext);
