import { Button, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import players from '../../Assets/Players';
import Dialog from '../../Core/Dialog';
import mechanics from '../../Assets/Mechanics';

function Inventory() {
  const { player, ui } = useStore();
  return (
    <Dialog open={ui.inventory} onClose={() => ui.setInventory(false)}>
      <Typography variant="h3">Inventory</Typography>
      <Stack>
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
              backgroundImage: `url("${players[player.character].img}")`,
              backgroundSize: 'cover',
            }}
          />
        </div>
        <Button variant="outlined" onClick={() => ui.setInventory(false)}>Close</Button>
      </Stack>
    </Dialog>
  );
}

export default observer(Inventory);
