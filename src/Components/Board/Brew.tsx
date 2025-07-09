import { observer } from 'mobx-react';
import { Collapse } from '@mui/material';
import { useStore } from '../../Core/Store';
import Rolls from './Rolls';
import Progress from '../Bars/Progress';
import Capacity from '../Bars/Capacity';
import Stability from '../Bars/Stability';
import Levels from '../../Assets/Levels';
import BrewActions from './BrewActions';

export const GRID_HEIGHT = 80;

function Brew() {
  const {
    level, capacityIsVisible, stabilityIsVisible,
  } = useStore();
  const isTutorial = level === Object.keys(Levels)[0];

  return (
    <>
      <Rolls />
      <Progress />
      {isTutorial ? <Collapse in={capacityIsVisible()}><Capacity /></Collapse> : <Capacity />}
      {isTutorial ? <Collapse in={stabilityIsVisible()}><Stability /></Collapse> : <Stability />}
      <BrewActions />
    </>
  );
};

export default observer(Brew);
