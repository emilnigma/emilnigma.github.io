import { Box, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Portrait from './Portrait';
import Dice from '../../Assets/Dice';
import Dice2 from './Dice';
import mechanics from '../../Assets/Mechanics';

function Rolls() {
  const {
    level, rollTheme, rollLeft, rollRight,
  } = useStore();
  // const sign = rollLeft === undefined || rollRight === undefined ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';
  const [themeLeft, themeRight] = rollTheme;
  return (
    <>
      <Typography>{level}</Typography>
      <div style={{ justifyItems: 'center', marginBottom: -100 }}>
        <Portrait img={mechanics.phase.img} />
      </div>
      <Stack direction="row" sx={{ height: '100px' }}>
        <Box sx={{ justifyItems: 'center', width: '100px', zIndex: 9 }}>
          <Dice2 num={rollLeft} theme={Dice[themeLeft]} />
        </Box>
        <Box flexGrow={1} />
        <Box sx={{ justifyItems: 'center', width: '100px', zIndex: 8 }}>
          <Dice2 num={rollRight} theme={Dice[themeRight]} />
        </Box>
      </Stack>
    </>
  );
}

export default observer(Rolls);
