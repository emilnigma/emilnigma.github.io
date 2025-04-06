import {
  Avatar, Card, CardMedia, Typography, Zoom,
} from '@mui/material';
import { sizes } from '../../Assets/Theme';
import ingredients from '../../Assets/Ingredients';
import mechanics from '../../Assets/Mechanics';
import { GRID_HEIGHT } from './Board';

export type IngredientProps = {
  value: number,
  kind: keyof typeof ingredients,
};

function Ingredient({ value, kind: color }: IngredientProps) {
  const { S } = sizes;
  return (
    <Zoom in>
      <Card sx={{
        border: `3px solid ${mechanics.cards.rgb}`,
        backgroundColor: mechanics.cards.rgb,
        boxSizing: 'border-box',
      }}
      >
        <CardMedia
          sx={{ height: GRID_HEIGHT }}
          image={ingredients[color].img}
        >
          <Avatar
            variant="square"
            sx={{
              width: S, height: S, backgroundColor: mechanics.cards.rgb, m: '-3px -3px', borderRadius: '3px',
            }}
          >
            <Typography sx={{ color: 'black' }} fontWeight={900}>{value}</Typography>
          </Avatar>
        </CardMedia>
      </Card>
    </Zoom>
  );
};

export default Ingredient;
