import { Button, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import ingredients from '../../Assets/Ingredients';
import mechanics from '../../Assets/Mechanics';
import players from '../../Assets/Players';
import potions from '../../Assets/Potions';
import TextIcon, {
  CurrencyIcon, EmeraldIcon, RubyIcon, SapphireIcon, ScoreIcon, TopazIcon,
} from '../TextIcon';
import Levels from '../../Assets/Levels';
import { useStore } from '../../Core/Store';
import Dice from '../../Assets/Dice';

const maxWidth = '500px';

function Start() {
  const { levelSet } = useStore();
  const levels = Object.keys(Levels).map((title) => {
    const onClick = () => levelSet(title);
    return (
      <Button
        variant="outlined"
        onClick={onClick}
        key={`start-level-${title}`}
      >
        {`${title}`}
      </Button>
    );
  });
  const allAssets = [
    ...Object.values(Dice).map(({ img }) => img),
    ...Object.values(ingredients).map(({ img }) => img),
    ...Object.values(mechanics).map(({ img }) => img),
    ...Object.values(players).map(({ img }) => img),
    ...potions.map(({ img }) => img),
  ];
  const assetCmps = allAssets.map((src) => <img width={30} src={src} alt="" key={src} />);
  return (
    <Stack direction="column" spacing={1} sx={{ maxWidth, m: 1 }}>

      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          textShadow: '0px 3px 3px #0000008a',
          zIndex: 1,
        }}
      >
        Brewery
      </Typography>

      <div style={{
        width: '100%',
        height: '300px',
        backgroundPosition: 'top',
        backgroundImage: 'url("assets/mechanics/main.jpg")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        marginTop: -80,
        marginBottom: -40,
        maskImage: 'linear-gradient(transparent 5%, rgba(0, 0, 0, 1.0) 25%, rgba(0, 0, 0, 1.0) 78%, transparent 90%)',
        zIndex: 0,
      }}
      />

      <Typography component="div">
        Welcome to the Brewery. You can brew various potions by drawing
        <span style={{ whiteSpace: 'nowrap', color: mechanics.cards.rgb }}>
          {' '}
          <TextIcon img={mechanics.cards.img} rgb={mechanics.cards.rgb} sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
          {' Ingredient Cards '}
        </span>
        from your deck. But watch out! If you use more than seven
        <span style={{ whiteSpace: 'nowrap', color: '#c57d54' }}>
          {' '}
          <TextIcon img={ingredients['Fire Lily'].img} rgb="red" sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
          {' Fire Lilies '}
        </span>
        your cauldron will explode.
      </Typography>

      <Typography component="div" sx={{ pb: 3 }}>
        Selling your potions will earn you
        <span style={{ whiteSpace: 'nowrap', color: mechanics.currency.rgb }}>
          {' '}
          <CurrencyIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
          {' Gold '}
        </span>
        and
        <span style={{ whiteSpace: 'nowrap', color: mechanics.topaz.rgb }}>
          {' '}
          <Stack direction="row" sx={{ display: 'inline-block' }} spacing={-0.6}>
            <EmeraldIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
            <RubyIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
            <SapphireIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
            <TopazIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
          </Stack>
          {' Gems '}
        </span>
        which can be used to buy more powerful ingredients. Your goal is to collect more
        <span style={{ whiteSpace: 'nowrap', color: mechanics.score.rgb }}>
          {' '}
          <ScoreIcon sx={{ width: '1rem', height: '1rem', mb: '-2px' }} />
          {' Victory Points '}
        </span>
        than your opponents.
      </Typography>

      {levels}

      <div style={{ height: 0, overflow: 'hidden' }}>
        <Typography variant="h4">Preload Assets</Typography>
        {assetCmps}
      </div>
    </Stack>
  );
};

export default observer(Start);
