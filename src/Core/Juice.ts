import { createRef } from 'react';

const Juice = {
  rollLeft: createRef<HTMLElement>(),
  rollRight: createRef<HTMLElement>(),
};
export default Juice;

type JuiceKey = keyof typeof Juice;

export const juice = (name: JuiceKey, className: string, duration = 0.3) => {
  const ref = Juice[name].current;
  if (ref === null) {
    console.warn('Cannot juice because its null:', name);
    return;
  }
  ref.classList.add(className);
  setTimeout(() => {
    ref.classList.remove(className);
  }, duration * 1000);
};
