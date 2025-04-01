import {
  Box, Stack, Tab, Tabs, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import players from '../../Assets/Players';

import TextIcon, { CurrencyIcon, RubyIcon, ScoreIcon } from '../TextIcon';
import phases from '../../Assets/Phases';
import mechanics from '../../Assets/Mechanics';

function PlayerInfo() {
  const store = useStore();
  const {
    character, rubies, score, currency, phase,
  } = store.getDisplayPlayer();
  const playerTabs = store.players.map(({ name }, i) => (
    <Tab
      label={<Typography>{name}</Typography>}
      onClick={() => store.setDisplayPlayer(i)}
      key={`player-tab-${name}`}
      sx={{ minWidth: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
    />
  ));
  const { symbol, title } = phases[phase];
  return (
    <>
      <Typography textAlign="center" sx={{ mb: -1 }}>
        {`Round ${store.round}`}
      </Typography>
      <Tabs value={store.displayPlayer} variant="fullWidth">
        {playerTabs}
      </Tabs>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <TextIcon
          text={symbol}
          rgb={mechanics.phase.rgb}
          img={mechanics.phase.img}
          large
        />
        <Typography flexGrow={1}>{title}</Typography>
        <ScoreIcon text={score} large />
        <CurrencyIcon text={currency} large />
        <RubyIcon text={rubies} large />
      </Stack>
      <Box sx={{ height: 280, display: 'flex', justifyContent: 'center' }}>
          <div
          style={{
            height: 340,
            maxWidth: 340,
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-38px',
            backgroundPosition: 'center',
            backgroundImage: `url("${mechanics.frame.img}")`,
            backgroundSize: 'cover',
          }}
          // image={mechanics.frame.img}
        >
          <div style={{
            width: '80%',
            height: '80%',
            backgroundPosition: 'center',
            backgroundImage: `url("${players[character].img}")`,
            backgroundSize: 'cover',
            maskImage: 'radial-gradient(circle at 50%, rgba(0, 0, 0, 1.0) 46%, transparent 52%)',
          }}
          />
        </div>
        
      </Box>
    </>
  );
}

export default observer(PlayerInfo);
