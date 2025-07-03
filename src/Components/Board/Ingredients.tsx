import {
  Button, Card, CardMedia, Grid, Typography,
} from '@mui/material';
import { useStore } from '../../Core/Store';
import ingredients from '../../Assets/Ingredients';

function Ingredients() {
  const { pageSet, startAnim } = useStore();
  const ingredientCmps = Object.entries(ingredients).map(([key, value]) => {
    const { img } = value;
    return (
      <Grid item key={`shop-item-${key}`} xs={3}>
        <Card>
          <CardMedia image={img} sx={{ height: '70px' }} />
          <Typography sx={{ height: '70px' }}>{key}</Typography>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Typography textAlign="center" variant="h3">Add Ingredient</Typography>
      <Grid container spacing={1}>
        {ingredientCmps}
      </Grid>
      <Button variant="outlined" onClick={() => { pageSet('brew'); startAnim(); }}>Back</Button>
    </>
  );
}

export default Ingredients;
