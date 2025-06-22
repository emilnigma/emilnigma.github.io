import { Button, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';

function Header() {
  const { player, ui } = useStore();
  return (
    <Grid container>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={() => ui.setInventory(true)}>Inventory</Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={player.pickChip}>Add Ingredient</Button>
      </Grid>
      <Grid item xs={4}>
        {null}
      </Grid>
    </Grid>
  );
}

export default observer(Header);
