import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type State = [string, (value: string) => void]

/**
 * Uses react-router's searchParams to access GET parameters.
 * This custom hook mimics the behavior of `React.useState()`.
 * @param key - string label to identify the value from URL
 * @param initial - fallback value to be used in case URL is empty
 * @returns `[value, setValue]`
 */
export const useUrlState = (key: string, initial: string): State => {
    const [searchParams, setSearchParams] = useSearchParams();
    const stateValue = searchParams.get(key) ?? initial;
    const setStateValue = (value: string) => {
        // if (value === '') {
        //     searchParams.delete(key);
        // } else {
            searchParams.set(key, value);
        // }
        setSearchParams(searchParams);
    };
    return [stateValue, setStateValue];
}

/**
 * Uses the browsers localStorage to initialize a react state.
 * The react state's setter is extended to also write to localStorage.
 * This custom hook mimics the behavior of `React.useState()`.
 * @param key - string label to identify the value from localStorage
 * @param initial - fallback value to be used in case localStorage is empty
 * @returns `[value, setValue]`
 */
export const usePersistentState = (key: string, initial: string): State => {
    const persistentValue = localStorage.getItem(key) ?? initial;
    const [value, setValue] = useState(persistentValue);
    const setPersistentValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    } 
    return [value, setPersistentValue];
}