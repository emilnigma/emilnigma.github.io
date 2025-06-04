import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import ShopItem from './ShopItem';
import mechanics from '../../Assets/Mechanics';

const GRID = 6;

function ShopFinalRound() {
  const { player } = useStore();
  const {
    setStat, gems, currency, score,
  } = player;
  return (
    <>
      <Typography variant="h2" textAlign="center">Marketplace</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4} lg={GRID}>
          <ShopItem
            name="Gold Hoarder"
            description="Exchange five Gold for one Victory Point."
            image={mechanics.currency.excess}
            height={280}
            cost={5}
            costKind="currency"
            onClick={() => setStat({ currency: currency - 5, score: score + 1 })}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={GRID}>
          <ShopItem
            name="We are the Gempions"
            description="Exchange two Gems for one Victory Point."
            image={mechanics.gems.excess}
            height={280}
            cost={2}
            costKind="gems"
            onClick={() => setStat({ gems: gems - 2, score: score + 1 })}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default observer(ShopFinalRound);
