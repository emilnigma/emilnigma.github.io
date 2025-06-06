import { Card, CardMedia, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { CurrencyIcon, RubyIcon, ScoreIcon } from '../TextIcon';
import mechanics from '../../Assets/Mechanics';
import { GRID_HEIGHT } from './Board';

type SquareProps = {
    currency?: number,
    score?: number,
    hasRuby?: boolean,
    isHighlight?: boolean,
    disabled?: boolean,
    isDrop?: boolean,
};

function Spot(props: SquareProps) {
  const {
    isDrop = false, disabled = false, currency = 0, score = 0, hasRuby = false, isHighlight = false,
  } = props;
  if (isDrop) {
    return (
      <Card
        elevation={0}
        sx={{ border: `3px solid ${mechanics.cards.rgb}`, backgroundColor: 'transparent' }}
      >
        <CardMedia
          sx={{ height: GRID_HEIGHT }}
          image={mechanics.cauldron.img}
        />
      </Card>
    );
  }
  if (disabled) {
    return (
      <Card
        elevation={0}
        sx={{
          border: `3px solid ${mechanics.empty.rgb}`, backgroundColor: 'transparent', height: GRID_HEIGHT,
        }}
      />
    );
  }
  const scoreCmp = score === 0 ? null : <ScoreIcon text={score} large />;
  const currencyCmp = <CurrencyIcon text={currency} large />;
  const rubyCmp = !hasRuby ? null : <RubyIcon large />;
  return (
    <Card
      elevation={0}
      sx={{
        filter: !isHighlight ? 'grayscale(90%)' : 'none',
        border: `3px solid ${isHighlight ? mechanics.cards.rgb : 'transparent'}`,
        backgroundColor: mechanics.empty.rgb,
        transition: '.5s',
      }}
    >
      <CardMedia sx={{ height: GRID_HEIGHT, display: 'flex' }}>
        <Stack direction="row" spacing={isHighlight ? 1 : -1.7} flexGrow={1} justifyContent="center" alignItems="center">
          {scoreCmp}
          {currencyCmp}
          {rubyCmp}
        </Stack>
      </CardMedia>
    </Card>
  );
};

export default observer(Spot);
