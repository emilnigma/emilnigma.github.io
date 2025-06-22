import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';

const sx = {
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: '8px',
  textAlign: 'center',
};

function Rolls() {
  const { rollTheme, rollLeft, rollRight } = useStore();
  const sign = rollLeft === 0 && rollRight === 0 ? 'vs' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid
        item
        xs={4}
        sx={sx}
      >
        <Typography>{ rollTheme[0] }</Typography>
        { rollLeft === 0 && rollRight === 0
          ? <img src={mechanics.dice.img} alt="" width="100px" />
          : <Typography variant="h3">{rollLeft}</Typography>}
      </Grid>
      <Grid
        item
        xs={2}
        sx={sx}
      >
        {sign}
      </Grid>
      <Grid
        item
        xs={4}
        sx={sx}
      >
        <Typography>{ rollTheme[1] }</Typography>
        { rollLeft === 0 && rollRight === 0
          ? <img src={mechanics.dice.img} alt="" width="100px" />
          : <Typography variant="h3">{rollRight}</Typography>}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default observer(Rolls);
