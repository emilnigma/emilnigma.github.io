import { observer } from 'mobx-react';
import { Grid } from '@mui/material';
import {
  boardPositions, goldAt, emeraldAt, scorePointsAt,
  rubyAt,
  sapphireAt,
  topazAt,
} from '../../Assets/BoardPositions';
import Spot from './Spot';
import { useStore } from '../../Core/Store';
import Ingredient from './Ingredient';

const GRID = 12 / 5;
export const GRID_HEIGHT = 80;

function Board() {
  const { player } = useStore();
  const { startingPosition, getChipOnBoard, getHighestChipOnBoard } = player;
  const highestChips = getHighestChipOnBoard();
  const disableUntil = highestChips.length > 0 ? highestChips[0].position : startingPosition;

  const boardCmps = boardPositions.map((positionOnBoard) => {
    if (startingPosition === positionOnBoard) {
      return (
        <Grid item xs={6} md={4} lg={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
          <Spot isDrop />
        </Grid>
      );
    }

    const disabled = positionOnBoard <= disableUntil;
    if (disabled) {
      const chipOnBoard = getChipOnBoard(positionOnBoard);
      // chip in spot
      if (chipOnBoard !== undefined) {
        const { value, kind: color } = chipOnBoard.chip;
        return (
          <Grid item xs={6} md={4} lg={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
            <Ingredient {...{ value, kind: color }} />
          </Grid>
        );
      }
    }

    // free spot
    const score = scorePointsAt(positionOnBoard);
    const isHighlight = positionOnBoard === disableUntil + 1;
    return (
      <Grid item xs={6} md={4} lg={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
        <Spot {...{
          score,
          currency: {
            gold: goldAt(positionOnBoard),
            emerald: emeraldAt(positionOnBoard) ? 1 : 0,
            ruby: rubyAt(positionOnBoard) ? 1 : 0,
            sapphire: sapphireAt(positionOnBoard) ? 1 : 0,
            topaz: topazAt(positionOnBoard) ? 1 : 0,
          },
          disabled,
          isHighlight,
        }}
        />
      </Grid>
    );
  });
  return (
    <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>{boardCmps}</Grid>
  );
};

export default observer(Board);
