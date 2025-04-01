import React from 'react';
import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import ShopItem from './ShopItem';
import mechanics from '../../Assets/Mechanics';

const GRID = 6;

function ShopFinalRound() {
  const player = useStore().getDisplayPlayer();
  const {
    setStat, rubies, currency, score,
  } = player;
  return (
    <>
      <Typography variant="h2" textAlign="center">Market</Typography>
      <Grid container spacing={1}>
        <Grid item xs={GRID}>
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
        <Grid item xs={GRID}>
          <ShopItem
            name="Rarer than Rubies"
            description="Exchange two Rubies for one Victory Point."
            image={mechanics.rubies.excess}
            height={280}
            cost={2}
            costKind="rubies"
            onClick={() => setStat({ rubies: rubies - 2, score: score + 1 })}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default observer(ShopFinalRound);
