import {
  Box, Grid, Stack, useTheme, useMediaQuery, Snackbar,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import Start from './Start';
import Board from '../Board/Board';
import Shop from '../Shop/Shop';
import PlayerInfo from '../Player/PlayerInfo';
import PlayerActions from '../Player/PlayerActions';

function Game() {
  const { players, getDisplayPlayer } = useStore();
  const theme = useTheme();
  const twoColumnLayout = useMediaQuery(theme.breakpoints.up('sm'));
  if (players.length === 0) return <div style={{ display: 'flex', justifyContent: 'center' }}><Start /></div>;
  const isShopping = getDisplayPlayer().phase === 4;
  const height = twoColumnLayout ? '100vh' : 'auto';
  return (
    <Grid container spacing={1}>
      <Snackbar
        open
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Tutorial "
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Stack direction="column" spacing={1}>
          <PlayerInfo />
          <PlayerActions />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Box sx={{ height, p: 1, overflow: 'auto' }}>
          {isShopping ? <Shop /> : <Board />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Game);
