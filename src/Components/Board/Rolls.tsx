import {
  Box, Chip, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Portrait from './Portrait';
import Juice from '../../Core/Juice';
import Dice from '../../Assets/Dice';

const sx = {
  borderRadius: '8px',
  textAlign: 'center',
};

function Rolls() {
  const { rollTheme, rollLeft, rollRight } = useStore();
  const sign = rollLeft === undefined || rollRight === undefined ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';
  const [themeLeft, themeRight] = rollTheme;

  return (
    <Stack direction="row" sx={{ borderWidth: '2px', borderStyle: 'solid', borderImage: 'linear-gradient(to right, transparent, #333, transparent) 1 0 1 0' }}>
      <Box flexGrow={1} sx={{ ...sx, width: '30%', justifyItems: 'center' }}>
        <Stack direction="row">
          <Chip
            label={`${themeLeft} 6`}
            size="small"
            sx={{
              fontSize: '1rem',
              backgroundColor: Dice[themeLeft].rgb,
              mb: -2,
              zIndex: 9,
            }}
          />
        </Stack>
        <Portrait img={`assets/dice/${themeLeft}.jpg`} text={`${rollLeft ?? ''}`} refe={Juice.rollLeft} />
      </Box>
      <Box sx={{ ...sx, width: '45px' }}>
        <Typography />
        <Typography
          variant="h2"
          fontFamily="PT Serif"
          sx={{ height: '192px', alignContent: 'center' }}
        >
          {sign}
        </Typography>
      </Box>
      <Box flexGrow={1} sx={{ ...sx, width: '30%', justifyItems: 'center' }}>
        <Stack direction="row">
          <Chip
            label={`${themeRight} 6`}
            size="small"
            sx={{
              fontSize: '1rem',
              backgroundColor: Dice[themeRight].rgb,
              mb: -2,
              zIndex: 9,
            }}
          />
        </Stack>
        <Portrait img={`assets/dice/${themeRight}.jpg`} text={`${rollRight ?? ''}`} refe={Juice.rollRight} />
      </Box>
    </Stack>
  );
}

export default observer(Rolls);

// --rich-black: #001219ff;
// --midnight-green: #005f73ff;
// --dark-cyan: #0a9396ff;
// --tiffany-blue: #94d2bdff;
// --vanilla: #e9d8a6ff;
// --gamboge: #ee9b00ff;
// --alloy-orange: #ca6702ff;
// --rust: #bb3e03ff;
// --rufous: #ae2012ff;
// --auburn: #9b2226ff;
