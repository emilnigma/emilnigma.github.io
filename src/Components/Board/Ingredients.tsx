import {
  Button, Card, CardMedia, Grid, Typography,
} from '@mui/material';
import { useStore } from '../../Core/Store';
import ingredients from '../../Assets/Ingredients';

function Ingredients() {
  const { pageSet, startAnim } = useStore();
  const ingredientCmps = Object.entries(ingredients).map(([key, value]) => {
    const { img } = value;
    const add = () => {
      pageSet('brew');
      startAnim();
      if (value.instantEffect) value.instantEffect();
    };
    return (
      <Grid item key={`shop-item-${key}`} xs={4}>
        <Card>
          <CardMedia image={img} sx={{ height: '70px' }} />
          <Typography sx={{ height: '70px' }}>{key}</Typography>
          <Button onClick={add}>Add</Button>
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
      <Button variant="outlined" onClick={() => { pageSet('brew'); }}>Back</Button>
    </>
  );
}

export default Ingredients;
