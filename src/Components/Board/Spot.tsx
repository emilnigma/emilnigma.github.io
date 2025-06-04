import {
  Box, Card, CardMedia, Stack,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import {
  CurrencyIcon, EmeraldIcon, RubyIcon, SapphireIcon, ScoreIcon,
  TopazIcon,
} from '../TextIcon';
import mechanics from '../../Assets/Mechanics';
import { GRID_HEIGHT } from './Board';
import PlayerActions from '../Player/PlayerActions';
import { initialCurrency } from '../Player/Player';

type SquareProps = {
    score?: number,
    currency: typeof initialCurrency,
    isHighlight?: boolean,
    disabled?: boolean,
    isDrop?: boolean,
};

function Spot(props: SquareProps) {
  const {
    isDrop = false, disabled = false, score = 0, isHighlight = false, currency,
  } = props;

  const ref = useRef<HTMLElement>();
  useEffect(() => {
    if (!isHighlight || ref === undefined) return;
    ref.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (isDrop) {
    return (
      <Card
        elevation={0}
        sx={{ height: GRID_HEIGHT, border: `3px solid ${mechanics.cards.rgb}`, backgroundColor: 'transparent' }}
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
      <Box
        sx={{
          height: GRID_HEIGHT,
          border: `3px solid ${mechanics.empty.rgb}`,
          borderRadius: '4px',
          backgroundColor: 'transparent',
        }}
      />
    );
  }
  if (isHighlight) {
    return (
      <Box
        ref={ref}
        sx={{
          height: GRID_HEIGHT,
          border: `3px solid ${mechanics.empty.rgb}`,
          borderRadius: '4px',
          backgroundColor: 'transparent',
        }}
      >
        <Stack direction="row">
          <PlayerActions />
        </Stack>
      </Box>
    );
  }
  const scoreCmp = score === 0 ? null : <ScoreIcon text={score} large />;
  const currencyCmp = <CurrencyIcon text={currency.gold} large />;
  const emeraldCmp = currency.emerald === 0 ? null : <EmeraldIcon large />;
  const rubyCmp = currency.ruby === 0 ? null : <RubyIcon large />;
  const sapphireCmp = currency.sapphire === 0 ? null : <SapphireIcon large />;
  const topazCmp = currency.topaz === 0 ? null : <TopazIcon large />;
  return (
    <Box
      sx={{
        display: 'flex',
        height: GRID_HEIGHT,
        width: '100%',
        filter: 'grayscale(90%)',
        border: '3px solid transparent',
        borderRadius: '4px',
        background: mechanics.empty.rgb,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: '.5s',
      }}
    >
      <Stack
        direction="row"
        spacing={isHighlight ? 1 : -1.7}
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        {scoreCmp}
        {currencyCmp}
        {emeraldCmp}
        {rubyCmp}
        {sapphireCmp}
        {topazCmp}
      </Stack>
    </Box>
  );
};

export default observer(Spot);
