import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useStore } from '../../Core/Store';
import Portrait from './Portrait';
import mechanics from '../../Assets/Mechanics';
import { randomBetween } from '../../Core/Random';
import Juice from '../../Core/Juice';

const sx = {
  borderRadius: '8px',
  textAlign: 'center',
};

function Rolls() {
  const {
    rollTheme, rollLeft, rollRight, rollSet, rollReset,
  } = useStore();
  const sign = rollLeft === undefined || rollRight === undefined ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';

  const [rollAnimLeft, setRollAnimLeft] = useState(1);
  const [rollAnimRight, setRollAnimRight] = useState(6);

  const startAnim = () => {
    rollReset();
    let speed = -150;
    let anim = 0;
    const frame = () => {
      anim = setTimeout(() => {
        setRollAnimLeft(randomBetween(1, 6));
        setRollAnimRight(randomBetween(1, 6));
        speed += 10;
        frame();
      }, Math.max(15, Math.abs(speed)));
    };
    frame();
    setTimeout(() => {
      clearTimeout(anim);
      rollSet([rollAnimLeft, rollAnimRight]);
    }, 5000);
  };

  return (
    <Stack direction="row" sx={{ borderWidth: '2px', borderStyle: 'solid', borderImage: 'linear-gradient(to right, transparent, #333, transparent) 1 0 1 0' }}>
      <Box flexGrow={1} sx={{ ...sx, width: '30%', justifyItems: 'right' }}>
        <Stack direction="row">
          <Typography sx={{ mr: 1 }}>{ `Dice of ${rollTheme[0]}` }</Typography>
          <Typography color={mechanics.phase.rgb}>1-6</Typography>
        </Stack>
        <Portrait img="assets/dice/light.jpg" text={rollLeft === undefined ? `${rollAnimLeft}` : `${rollLeft}`} refe={Juice.rollLeft} />
      </Box>
      <Box sx={{ ...sx, width: '45px' }}>
        <Typography>vs</Typography>
        <Typography variant="h2" sx={{ height: '200px', alignContent: 'center' }}>{sign}</Typography>
      </Box>
      <Box flexGrow={1} sx={{ ...sx, width: '30%' }}>
        <Stack direction="row">
          <Typography sx={{ mr: 1 }}>{ `Dice of ${rollTheme[1]}` }</Typography>
          <Typography color={mechanics.phase.rgb}>1-6</Typography>
        </Stack>
        <Portrait img="assets/dice/shadow.jpg" text={rollRight === undefined ? `${rollAnimRight}` : `${rollRight}`} refe={Juice.rollRight} />
      </Box>
      <Button onClick={() => startAnim()}>Start</Button>
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
