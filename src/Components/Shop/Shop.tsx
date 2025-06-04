import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import ShopIngredient from './ShopIngredient';
import ingredients from '../../Assets/Ingredients';
import ShopFinalRound from './ShopFinalRound';
import ShopItem from './ShopItem';
import mechanics from '../../Assets/Mechanics';

const GRID = 12 / 5;

function Shop() {
  const { player, settings, round } = useStore();
  if (round === settings.rounds) return <ShopFinalRound />;

  const {
    setStat, startingPosition, effects: { hasDilute = false, fireResistance = 7 },
  } = player;
  return (
    <Grid container spacing={1}>
      {Object.keys(ingredients).map((ingredient) => (
        <Grid item xs={6} md={4} lg={GRID} key={`ingredient-${ingredient}`}>
          <ShopIngredient ingredient={ingredient as keyof typeof ingredients} />
        </Grid>
      ))}
      <Grid item xs={6} md={4} lg={GRID}>
        <ShopItem
          name="Dilution"
          description="Refill your Dilution Solution. Diluting allows you to return the last Ingredient from your cauldron."
          image={mechanics.dilute.img}
          cost={2}
          costKind="emerald"
          onClick={() => setStat({ gems: { ...gems, emerald: gems.emerald - 2 }, effects: { hasDilute: true } })}
          disabled={hasDilute}
        />
      </Grid>
      <Grid item xs={6} md={4} lg={GRID}>
        <ShopItem
          name="Advantage"
          description="Permanently move your starting position by one spot. This way you get a head start in the following rounds."
          cost={2}
          costKind="emerald"
          onClick={() => setStat({ gems: { ...gems, emerald: gems.emerald - 2 }, startingPosition: startingPosition + 1 })}
        />
      </Grid>
      <Grid item xs={6} md={4} lg={GRID}>
        <ShopItem
          name="Fire Resistance"
          description="Permanently reinforce your cauldron thereby increasing your resistance to Fire Lilies by one."
          image={mechanics.fire_resistance.img}
          cost={3}
          costKind="emerald"
          onClick={() => setStat({ gems: { ...gems, emerald: gems.emerald - 3 }, effects: { fireResistance: fireResistance + 1 } })}
        />
      </Grid>
    </Grid>
  );
}

export default observer(Shop);
