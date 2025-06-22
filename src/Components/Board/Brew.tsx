import { observer } from 'mobx-react';
import { Button, Collapse, Stack } from '@mui/material';
import { useState } from 'react';
import { useStore } from '../../Core/Store';
import Rolls from './Rolls';
import Progress from '../Bars/Progress';
import Capacity from '../Bars/Capacity';
import Stability from '../Bars/Stability';

export const GRID_HEIGHT = 80;

function Brew() {
  const {
    level,
    tooltipSet,
    progress, progressMax,
    capacity, capacityMax, capacitySet, capacityIsVisible,
    stability, stabilityLeftBound, stabilityRightBound, stabilitySet, stabilityIsVisible,
    quality,
    addIngredient,
  } = useStore();
  const [introducedProgress, setIntroducedProgress] = useState(false);
  const [introducedCapacity, setIntroducedCapacity] = useState(false);
  const [introducedStability, setIntroducedStability] = useState(false);

  const isFull = capacity >= capacityMax;
  const isStable = stability <= stabilityLeftBound && stability >= stabilityRightBound;
  const isTutorial = level === 1;

  const [gold, silver, copper] = quality;
  const qualityString = `${gold > 0 ? `${gold} G ` : ''}${gold > 0 || silver > 0 ? `${silver} S ` : ''}${`${copper} C`}`;

  if (isTutorial && !introducedProgress) {
    tooltipSet('progress');
    setIntroducedProgress(true);
  }

  if (capacityIsVisible() && !introducedCapacity) {
    capacitySet(2);
    tooltipSet('capacity');
    setIntroducedCapacity(true);
  }

  if (stabilityIsVisible() && !introducedStability) {
    stabilitySet(0);
    tooltipSet('stability');
    setIntroducedStability(true);
  }

  return (
    <Stack direction="column" spacing={1} sx={{ m: 1 }}>
      <Rolls />
      <Progress />
      {isTutorial ? <Collapse in={capacityIsVisible()}><Capacity /></Collapse> : <Capacity />}
      {isTutorial ? <Collapse in={stabilityIsVisible()}><Stability /></Collapse> : <Stability />}

      <br />

      <Button variant="outlined" onClick={addIngredient} disabled={!isStable || isFull}>Add Ingredient</Button>
      {progress < progressMax
        ? null
        : <Button variant="outlined" onClick={() => {}}>{`Sell for ${qualityString}`}</Button>}
    </Stack>
  );
};

export default observer(Brew);
