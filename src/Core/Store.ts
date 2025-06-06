/* eslint-disable no-use-before-define */
import { action, makeObservable, observable } from 'mobx';
import { createContext, createRef, useContext } from 'react';
import Player, { PlayerProps, PlayerStats } from '../Components/Player/Player';
import ingredients from '../Assets/Ingredients';
import characters from '../Assets/Players';
import { shuffle } from './Random';
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

  public players: Player[] = [];
  public setPlayers = (players: Player[]) => {
    this.players = players;
  };
  public startGame = (players: string[]) => {
    if (players.length === 0) throw new Error('Store.ts | startGame | no players');
    const shuffledCharacters = shuffle(Object.keys(characters));
    const playerStates = players.map((p, i) => new Player(p, shuffledCharacters[i], this));
    this.setPlayers(playerStates);
    console.log('☕ Starting game for:', ...players);
  };

  public displayPlayer = 0;
  public getDisplayPlayer = () => this.players[this.displayPlayer];
  public setDisplayPlayer = (index: number) => {
    if (index < 0 || index >= this.players.length) throw new Error('Store.ts | setDisplayPlayer | out of bounds');
    this.displayPlayer = index;
  };

  public getLeadingPlayer = () => [...this.players].sort(({ score: s1 }, { score: s2 }) => s2 - s1)[0];

  public round = 1;
  public startNewRound = () => {
    this.players.forEach((p) => p.resetForRound());
    this.round += 1;
    this.saveGame();
  };

  readonly saveGame = () => {
    localStorage.setItem('saveGame', JSON.stringify({
      round: this.round,
      players: this.players,
    }));
  };

  static readonly readGame = () => {
    const gameString = localStorage.getItem('saveGame');
    return gameString !== null;
  };

  static readonly clearGame = () => {
    localStorage.clear();
  };

  readonly restoreGame = () => {
    if (!Store.readGame()) return;
    const gameString = localStorage.getItem('saveGame');
    const { round, players } = JSON.parse(gameString!);
    this.round = round;
    const playerStats = (players as (PlayerProps & PlayerStats)[]).map((p) => Player.fromJSON(p, this));
    this.setPlayers(playerStats);
  };

  scoreRef = createRef();
  currencyRef = createRef();
  rubyRef = createRef();

  constructor() {
    makeObservable(this, {
      players: observable,
      setPlayers: action,
      settings: observable,
      setSettings: action,
      displayPlayer: observable,
      setDisplayPlayer: action,
    });
  }
};

export const StoreContext = createContext(Store.getInstance());
export const useStore = () => useContext(StoreContext);
