import { observer } from 'mobx-react';
import { Grid } from '@mui/material';
import {
  boardPositions, currencyPointsAt, rubyAt, scorePointsAt,
} from '../../Assets/BoardPositions';
import Spot from './Spot';
import { useStore } from '../../Core/Store';
import Ingredient from './Ingredient';

const GRID = 2;

function Board() {
  const { displayPlayer, players } = useStore();
  const { startingPosition, getChipOnBoard, getHighestChipOnBoard } = players[displayPlayer];
  const highestChips = getHighestChipOnBoard();
  const disableUntil = highestChips.length > 0 ? highestChips[0].position : -9;

  const boardCmps = boardPositions.map((positionOnBoard) => {
    if (startingPosition === positionOnBoard) {
      return (
        <Grid item xs={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
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
          <Grid item xs={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
            <Ingredient {...{ value, kind: color }} />
          </Grid>
        );
      }
    }

    // free spot
    const currency = currencyPointsAt(positionOnBoard);
    const score = scorePointsAt(positionOnBoard);
    const hasRuby = rubyAt(positionOnBoard);
    const isHighlight = positionOnBoard === disableUntil + 1;
    return (
      <Grid item xs={GRID} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
        <Spot {...{
          currency, score, hasRuby, disabled, isHighlight,
        }}
        />
      </Grid>
    );
  });
  return <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>{boardCmps}</Grid>;
};

export default observer(Board);
