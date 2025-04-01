import { Box, Stack } from '@mui/material';
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
    <Stack direction="row" spacing={1}>
      <Stack direction="column" spacing={0}>
        <PlayerInfo />
        <PlayerActions />
      </Stack>
      <Box sx={{ height: '100vh', p: 1, overflow: 'auto' }}>
        {isShopping ? <Shop /> : <Board />}
      </Box>
    </Stack>
  );
};

export default observer(Game);
