import { action, makeObservable, observable } from "mobx";
import React, { useContext } from "react";

export class AppStore {
    private static instance?: AppStore
    public static getInstance = () => {
        AppStore.instance ??= new AppStore();
        return AppStore.instance;
    }

    public palette = { light: '', dark: '', text: '', highlight: '' }
    public setPalette = (pallete: typeof this.palette) => { this.palette = pallete}

    private constructor() {
        makeObservable(this, {
            palette: observable,
            setPalette: action,
        })
    }

}

export const AppContext = React.createContext(AppStore.getInstance())
export const useApp = () => useContext(AppContext)