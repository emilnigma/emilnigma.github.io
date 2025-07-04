import { observer } from 'mobx-react';
import { Button, Collapse } from '@mui/material';
import { useState } from 'react';
import { useStore } from '../../Core/Store';
import Rolls from './Rolls';
import Progress from '../Bars/Progress';
import Capacity from '../Bars/Capacity';
import Stability from '../Bars/Stability';
import Levels from '../../Assets/Levels';

export const GRID_HEIGHT = 80;

function Brew() {
  const {
    pageSet,
    level,
    tooltipSet,
    progress, progressMax,
    capacity, capacityMax, capacityIsVisible,
    stability, stabilityLeftBound, stabilityRightBound, stabilityIsVisible,
    quality,
  } = useStore();
  const isTutorial = level === Object.keys(Levels)[0];
  const [introducedProgress, setIntroducedProgress] = useState(!isTutorial);
  const [introducedCapacity, setIntroducedCapacity] = useState(!isTutorial);
  const [introducedStability, setIntroducedStability] = useState(!isTutorial);

  const isFull = capacity >= capacityMax;
  const isStable = stability <= stabilityLeftBound && stability >= stabilityRightBound;

  const [gold, silver, copper] = quality;
  const qualityString = `${gold > 0 ? `${gold} G ` : ''}${gold > 0 || silver > 0 ? `${silver} S ` : ''}${`${copper} C`}`;

  if (!introducedProgress) {
    tooltipSet('progress');
    setIntroducedProgress(true);
  }

  if (introducedProgress && capacityIsVisible() && !introducedCapacity) {
    tooltipSet('capacity');
    setIntroducedCapacity(true);
  }

  if (introducedCapacity && stabilityIsVisible() && !introducedStability) {
    tooltipSet('stability');
    setIntroducedStability(true);
  }

  return (
    <>
      <Rolls />
      <Progress />
      {isTutorial ? <Collapse in={capacityIsVisible()}><Capacity /></Collapse> : <Capacity />}
      {isTutorial ? <Collapse in={stabilityIsVisible()}><Stability /></Collapse> : <Stability />}

      <Button variant="outlined" onClick={() => pageSet('ingredients')} disabled={!isStable || isFull}>
        Add Ingredient
      </Button>
      {progress < progressMax
        ? null
        : <Button variant="outlined" onClick={() => {}}>{`Sell for ${qualityString}`}</Button>}
    </>
  );
};

export default observer(Brew);
