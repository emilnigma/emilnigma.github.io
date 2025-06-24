import { Button, Grid, Typography } from '@mui/material';
import { useStore } from '../../Core/Store';

function Ingredients() {
  const { pageSet } = useStore();
  return (
    <>
      <Typography textAlign="center" variant="h3">Add Ingredient</Typography>
      <Grid container>
        <Grid item xs={4}>
          ing1
        </Grid>
        <Grid item xs={4}>
          ing2
        </Grid>
        <Grid item xs={4}>
          ing3
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={() => pageSet('brew')}>Back</Button>
    </>
  );
}

export default Ingredients;
