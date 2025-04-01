import { observer } from 'mobx-react';
import {
  Badge, Button, Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import ingredients from '../../Assets/Ingredients';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';
import { CurrencyIcon } from '../TextIcon';

type ShopItemProps = {
    ingredient: keyof typeof ingredients
};

function ShopIngredient({ ingredient }: ShopItemProps) {
  const {
    addToCart, setStat, currency, effects: { isHaggling = 0 },
  } = useStore().getDisplayPlayer();
  const { available, img, description } = ingredients[ingredient];
  const purchase = (cost: number, value: number) => {
    const effects = isHaggling > 0 ? { isHaggling: isHaggling - 1 } : undefined;
    setStat({ currency: currency - cost, effects });
    addToCart({ value, kind: ingredient });
  };
  const availableCmps = available.map(({ value, cost }) => {
    const adjustedCost = isHaggling > 0 ? Math.ceil(cost * 0.7) : cost;
    return (
      <Badge
        key={`buy-option-${ingredient}-${value}`}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={(
          <CurrencyIcon
            text={adjustedCost}
            small
            sx={{ filter: adjustedCost > currency ? 'grayscale(100%)' : 'none' }}
          />
      )}
      >
        <Button
          variant="contained"
          disabled={adjustedCost > currency}
          key={`shop-item-${ingredient}-${value}`}
          onClick={() => purchase(adjustedCost, value)}
          sx={{ minWidth: 0 }}
        >
          <Typography variant="h5">{value}</Typography>
        </Button>
      </Badge>
    );
  });
  const buyCmp = available.length === 0
    ? null
    : (
      <>
        <Typography fontSize={12} color="black" align="center" sx={{ pt: 1 }}>Available Qualities:</Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {availableCmps}
        </Stack>
      </>
    );
  return (
    <Card sx={{
      border: `3px solid ${mechanics.cards.rgb}`,
      backgroundColor: mechanics.cards.rgb,
      boxSizing: 'border-box',
      ':last-child': { pb: 0 },
      height: '100%',
    }}
    >
      <CardMedia
        sx={{ height: 120 }}
        image={img}
      />
      <CardContent sx={{ display: 'flex', p: 1, ':last-child': { pb: 1 } }}>
        <Stack direction="column" justifyContent="space-between">
          <Typography color="black" textAlign="center">{ingredient}</Typography>
          <Typography color="black" fontStyle="italic">{description}</Typography>
          {buyCmp}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default observer(ShopIngredient);
