import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Portrait from './Portrait';
import Juice from '../../Core/Juice';
import Dice from '../../Assets/Dice';
import Dice2 from './Dice';

function Rolls() {
  const {
    level, rollTheme, rollLeft, rollRight,
  } = useStore();
  // const sign = rollLeft === undefined || rollRight === undefined ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';
  const [themeLeft, themeRight] = rollTheme;
  return (
    <>
      <Typography>{level}</Typography>
      <Grid container textAlign="center" justifyContent="center">
        <Grid item xs={6} display="grid" justifyContent="center" sx={{ zIndex: 9, overflow: 'hidden' }}>
          <Portrait img={Dice[themeLeft].bg} refe={Juice.rollLeft}>
            <Dice2 num={rollLeft} img={Dice[themeLeft].img} />
          </Portrait>
        </Grid>
        <Grid item xs={6} display="grid" justifyContent="center" sx={{ zIndex: 8, overflow: 'hidden' }}>
          <Portrait img={Dice[themeRight].bg} refe={Juice.rollRight}>
            <Dice2 num={rollRight} img={Dice[themeRight].img} />
          </Portrait>
        </Grid>
      </Grid>
    </>
  );
}

export default observer(Rolls);
