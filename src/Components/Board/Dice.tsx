export type DiceProps = {
    num: number | undefined
    img: string
};
/*
const positions = [
  { x: 0, y: 0, z: 0 },
  { x: -6, y: -15, z: 0 },
  { x: 90 - 9, y: 0, z: 10 },
  { x: -12, y: -90 - 5, z: 0 },
  { x: -12, y: 90 + 5, z: 0 },
  { x: -90 - 9, y: 0, z: 10 },
  { x: -180 - 6, y: -15, z: 180 },
];
*/

function Dice({ num, img }: DiceProps) {
  const style = { backgroundImage: `url(${img})` };
  return (
    <div className={`dice show-${num}`}>
      <div id="dice-one-side-one" className="side one" style={style}>1</div>
      <div id="dice-one-side-two" className="side two" style={style}>2</div>
      <div id="dice-one-side-three" className="side three" style={style}>3</div>
      <div id="dice-one-side-four" className="side four" style={style}>4</div>
      <div id="dice-one-side-five" className="side five" style={style}>5</div>
      <div id="dice-one-side-six" className="side six" style={style}>6</div>
    </div>
  );
}

export default Dice;
