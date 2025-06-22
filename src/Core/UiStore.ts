import { action, makeObservable, observable } from 'mobx';

class UiStore {
  inventory = false;
  setInventory = (inventory: boolean) => {
    this.inventory = inventory;
  };

  constructor() {
    makeObservable(this, {
      inventory: observable,
      setInventory: action,
    });
  }
}

export default UiStore;
