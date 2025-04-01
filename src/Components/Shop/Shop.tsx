import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import ShopIngredient from './ShopIngredient';
import ingredients from '../../Assets/Ingredients';
import ShopFinalRound from './ShopFinalRound';
import ShopItem from './ShopItem';
import mechanics from '../../Assets/Mechanics';

const GRID = 12 / 5;

function Shop() {
  const { getDisplayPlayer, settings, round } = useStore();
  if (round === settings.rounds) return <ShopFinalRound />;

  const {
    setStat, rubies, startingPosition, effects: { hasDilute = false },
  } = getDisplayPlayer();
  return (
    <>
      <Typography variant="h2" textAlign="center">Market</Typography>
      <Grid container spacing={1}>
        {Object.keys(ingredients).map((ingredient) => (
          <Grid item  xs={6} md={4} lg={GRID} key={`ingredient-${ingredient}`}>
            <ShopIngredient ingredient={ingredient as keyof typeof ingredients} />
          </Grid>
        ))}
        <Grid item xs={6} md={4} lg={GRID}>
          <ShopItem
            name="Dilution"
            description="Refill your Dilution Solution. Diluting allows you to return the last Ingredient from your cauldron."
            image={mechanics.dilute.img}
            cost={2}
            costKind="rubies"
            onClick={() => setStat({ rubies: rubies - 2, effects: { hasDilute: true } })}
            disabled={hasDilute}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={GRID}>
          <ShopItem
            name="Advantage"
            description="Permanently move your starting position by one to get a head start."
            cost={2}
            costKind="rubies"
            onClick={() => setStat({ rubies: rubies - 2, startingPosition: startingPosition + 1 })}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default observer(Shop);
