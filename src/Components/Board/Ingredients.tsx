import {
  Button, Card, CardMedia, Grid, Typography,
} from '@mui/material';
import { useStore } from '../../Core/Store';
import ingredients from '../../Assets/Ingredients';
import mechanics from '../../Assets/Mechanics';

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
      <Grid item key={`shop-item-${key}`} xs={4} onClick={add}>
        <Card
          sx={{ border: `2px solid ${mechanics.phase.rgb}80`, cursor: 'pointer' }}
        >
          <CardMedia image={img} sx={{ height: '70px' }} />
          <Typography align="center" alignContent="center" color={mechanics.phase.rgb} sx={{ height: '50px' }}>{key}</Typography>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Typography textAlign="center" variant="h3">Add Ingredient</Typography>
      <div>
        <Grid container spacing={1}>
          {ingredientCmps}
        </Grid>
      </div>
      <Button variant="outlined" onClick={() => { pageSet('brew'); }}>Back</Button>
    </>
  );
}

export default Ingredients;
