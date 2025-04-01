import {
  Badge, Button, Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';
import TextIcon from '../TextIcon';

type ShopItemProps = {
  name: string
  cost: number
  costKind: 'score' | 'currency' | 'rubies'
  description: string
  onClick: () => void
  disabled?: boolean
  image?: string
  height?: number
};

function ShopItem({
  name, cost, description, onClick, costKind, disabled, image, height = 120,
}: ShopItemProps) {
  const player = useStore().getDisplayPlayer();
  const { img, rgb } = mechanics[costKind];
  return (
    <Card sx={{
      border: `3px solid ${mechanics.cards.rgb}`,
      backgroundColor: mechanics.cards.rgb,
      boxSizing: 'border-box',
      height: '100%',
    }}
    >
      <CardMedia
        sx={{ height }}
        image={image ?? mechanics.drop.img}
      />
      <CardContent sx={{ display: 'flex' }}>
        <Stack direction="column">
          <Typography color="black" textAlign="center">{name}</Typography>
          <Typography color="black" fontStyle="italic">{description}</Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={(
                <TextIcon
                  img={img}
                  rgb={rgb}
                  text={cost}
                  small
                  sx={{ filter: player[costKind] < cost ? 'grayscale(90%)' : 'none' }}
                />
                )}
            >
              <Button
                variant="contained"
                disabled={player[costKind] < cost || disabled}
                key="shop-item-cauldron"
                onClick={() => { onClick(); player.addToCart(name); }}
                sx={{ minWidth: 0 }}
              >
                <Typography variant="h5">+</Typography>
              </Button>
            </Badge>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default observer(ShopItem);
