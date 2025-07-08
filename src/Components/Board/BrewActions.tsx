import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import { useStore } from '../../Core/Store';

export const GRID_HEIGHT = 80;

function BrewActions() {
  const {
    pageSet,
    progressIsDone,
    capacityIsFail,
    stabilityIsFail,
    quality,
  } = useStore();

  const [gold, silver, copper] = quality;
  const qualityString = `${gold > 0 ? `${gold} G ` : ''}${gold > 0 || silver > 0 ? `${silver} S ` : ''}${`${copper} C`}`;

  if (stabilityIsFail()) {
    return (
      <Button variant="outlined" onClick={() => { pageSet('start'); }} color="error">
        Explosion! Try again!
      </Button>
    );
  }

  if (capacityIsFail()) {
    return (
      <Button variant="outlined" onClick={() => { pageSet('start'); }} color="error">
        Overflow! Try again!
      </Button>
    );
  }

  if (progressIsDone()) {
    return (
      <Button variant="outlined" onClick={() => { pageSet('start'); }}>
        {`Sell for ${qualityString}`}
      </Button>
    );
  }

  return (
    <Button variant="outlined" onClick={() => pageSet('ingredients')}>
      Add Ingredient
    </Button>
  );
};

export default observer(BrewActions);
