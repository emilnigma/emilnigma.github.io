import { range } from '../../Core/Random';

export type DiceProps = {
    num: number | undefined
    theme: {img: string, rgb: string}
};

function Dice({ num, theme: { img, rgb } }: DiceProps) {
  const style = {
    backgroundImage: `url(${img})`,
    borderColor: rgb,
  };
  const sides = range(6).map((i) => (
    <div className="side" style={style}>
      {range(i + 1).map(() => <span style={{ borderColor: rgb }} />)}
    </div>
  ));
  return (
    <div className={`dice show-${num}`}>
      {sides}
    </div>
  );
}

export default Dice;
