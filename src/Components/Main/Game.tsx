import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Start from './Start';
import Board from '../Board/Board';
import Shop from '../Shop/Shop';
import PlayerInfo from '../Player/PlayerInfo';

function Game() {
  const { players, getDisplayPlayer } = useStore();
  if (players.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Start />
      </div>
    );
  }
  const isShopping = getDisplayPlayer().phase === 4;
  return (
    <>
      <Box sx={{
        display: 'flex', height: '200px', justifyContent: 'center',
      }}
      >
        <PlayerInfo />
      </Box>
      <Box sx={{
        display: 'flex', height: 'calc(100vh - 200px)', overflow: 'auto',
      }}
      >
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item sx={{ display: 'flex' }}>
            {isShopping ? <Shop /> : <Board />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default observer(Game);
