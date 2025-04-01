export type PhaseInfo = {
    symbol: string
    title: string
};

const phases: Record<number, PhaseInfo> = {
  1: {
    symbol: 'I',
    title: 'Brewing',
  },
  2: {
    symbol: 'II',
    title: 'Sell Potion',
  },
  3: {
    symbol: 'III',
    title: 'Effects',
  },
  4: {
    symbol: 'IV',
    title: 'Shopping',
  },
  5: {
    symbol: '✔',
    title: 'Done',
  },
};

export type PhaseNumber = keyof typeof phases;

export default phases;
