import {
  Box, Button, Menu, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';
import { useStore } from '../../Core/Store';

import {
  CurrencyIcon, EmeraldIcon, RubyIcon, SapphireIcon, ScoreIcon, TopazIcon,
} from '../TextIcon';
import phases from '../../Assets/Phases';
import mechanics from '../../Assets/Mechanics';
import potions from '../../Assets/Potions';

function PlayerInfo() {
  const store = useStore();
  const {
    score, currency, phase, potion,
  } = store.player;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { symbol, title } = phases[phase];
  return (
    <Stack
      direction="row"
      sx={{
        position: 'sticky', top: 0, backgroundColor: '#222222', zIndex: 99,

      }}
    >
      <Box sx={{
        width: 200, display: 'flex', justifyContent: 'center',
      }}
      >
        <div
          style={{
            height: 200,
            width: 200,
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: '-38px',
            backgroundPosition: 'center',
            backgroundImage: `url("${mechanics.frame.img}")`,
            backgroundSize: 'cover',
          }}
        >
          <div style={{
            width: '90%',
            height: '90%',
            marginTop: '2px',
            backgroundPosition: 'center',
            backgroundImage: phase === 2
              ? `url("${potions[potion].img}")`
              : `url("${mechanics.cauldron.img}")`,
            backgroundSize: 'cover',
            maskImage: 'radial-gradient(circle at 50%, rgba(0, 0, 0, 1) 52%, transparent 56%)',
          }}
          />
        </div>
      </Box>

      <Stack>
        <Button variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <FormatListBulletedIcon sx={{ pl: 1 }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl !== null}
          onClose={() => setAnchorEl(null)}
        >
          {/* <Typography>{`Round ${store.round} of ${store.settings.rounds}`}</Typography> */}
          <Typography>{`Phase ${symbol}: ${title}`}</Typography>
        </Menu>

        <Stack direction="row">
          <ScoreIcon text={score} large />
          <CurrencyIcon text={currency.gold} large />
        </Stack>

        <Stack direction="row">
          {currency.emerald === 0 ? null : <EmeraldIcon text={currency.emerald} large />}
          {currency.ruby === 0 ? null : <RubyIcon text={currency.ruby} large />}
          {currency.sapphire === 0 ? null : <SapphireIcon text={currency.sapphire} large />}
          {currency.topaz === 0 ? null : <TopazIcon text={currency.topaz} large />}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default observer(PlayerInfo);
