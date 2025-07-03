import {
  Box, Chip, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Portrait from './Portrait';
import Juice from '../../Core/Juice';
import Dice from '../../Assets/Dice';

function Rolls() {
  const {
    level, rollTheme, rollLeft, rollRight,
  } = useStore();
  const sign = rollLeft === undefined || rollRight === undefined ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';
  const [themeLeft, themeRight] = rollTheme;

  return (
    <>
      <Typography>{level}</Typography>
      <Stack direction="row" textAlign="center" justifyContent="center">
        <Box sx={{ justifyItems: 'center' }}>
          <Portrait img={Dice[themeLeft].img} text={`${rollLeft ?? ''}`} refe={Juice.rollLeft} />
          <Chip
            label={`${themeLeft} 6`}
            size="small"
            sx={{
              fontSize: '1rem',
              backgroundColor: Dice[themeLeft].rgb,
              mt: -2,
              zIndex: 9,
            }}
          />
        </Box>
        <Box sx={{ width: '45px' }}>
          <Typography
            variant="h2"
            fontFamily="PT Serif"
            sx={{ height: '192px', alignContent: 'center' }}
          >
            {sign}
          </Typography>
        </Box>
        <Box sx={{ justifyItems: 'center' }}>
          <Portrait img={Dice[themeRight].img} text={`${rollRight ?? ''}`} refe={Juice.rollRight} />
          <Chip
            label={`${themeRight} 6`}
            size="small"
            sx={{
              fontSize: '1rem',
              backgroundColor: Dice[themeRight].rgb,
              mt: -2,
              zIndex: 9,
            }}
          />
        </Box>
      </Stack>
    </>
  );
}

export default observer(Rolls);
