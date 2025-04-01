import { useState } from 'react';

/**
 * Uses the browsers localStorage to initialize a react state.
 * The react state's setter is extended to also write to localStorage.
 * This custom hook mimics the behavior of `React.useState()`.
 * @param key - string label to identify the value from localStorage
 * @param initial - fallback value to be used in case localStorage is empty
 * @returns `[value, setValue]`
 */
export default (key: string, initial: string): [string, (value: string) => void] => {
  const persistentValue = localStorage.getItem(key) ?? initial;
  const [value, setValue] = useState(persistentValue);
  const setPersistentValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };
  return [value, setPersistentValue];
};
