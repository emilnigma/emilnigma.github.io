import { Box, Grid, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Start from './Start';
import Board from '../Board/Board';
import Shop from '../Shop/Shop';
import PlayerInfo from '../Player/PlayerInfo';
import PlayerActions from '../Player/PlayerActions';

function Game() {
  const { players, getDisplayPlayer } = useStore();
  if (players.length === 0) return <div style={{ display: 'flex', justifyContent: 'center' }}><Start /></div>;
  const isShopping = getDisplayPlayer().phase === 4;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Stack direction="column" spacing={1}>
          <PlayerInfo />
          <PlayerActions />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Box sx={{ height: '100vh', p: 1, overflow: 'auto' }}>
          {isShopping ? <Shop /> : <Board />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Game);
