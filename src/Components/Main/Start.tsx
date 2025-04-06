import { useState } from 'react';
import {
  Button, ButtonGroup, Chip, IconButton, Input, Stack, Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { observer } from 'mobx-react';
import Store, { useStore } from '../../Core/Store';
import ingredients from '../../Assets/Ingredients';
import mechanics from '../../Assets/Mechanics';
import players from '../../Assets/Players';
import potions from '../../Assets/Potions';
import TextIcon, { CurrencyIcon, RubyIcon, ScoreIcon } from '../TextIcon';
import Player from '../Player/Player';

const maxWidth = '500px';

function Start() {
  const {
    startGame, settings, setSettings, restoreGame,
  } = useStore();

  const [hasPrevGame, setHasPrevGame] = useState(Store.readGame());
  const { round: prevRound, players: _prevPlayers } = hasPrevGame
    ? JSON.parse(localStorage.getItem('saveGame')!)
    : { round: 0, players: [] };
  const prevPlayers = _prevPlayers as Player[];

  const [newPlayer, setNewPlayer] = useState('');
  const [playerList, setPlayerList] = useState(['Alice', 'Bob']);
  const removePlayer = (p1: string) => {
    const filtered = playerList.filter((p2) => p1 !== p2);
    setPlayerList([...filtered]);
  };
  const addPlayer = () => {
    setPlayerList([...playerList, newPlayer]);
    setNewPlayer('');
  };
  const addButton = (
    <IconButton
      onClick={addPlayer}
      disabled={newPlayer === '' || playerList.includes(newPlayer)}
    >
      <Add color="primary" />
    </IconButton>
  );
  const playerCmps = playerList.map((p) => <Chip label={p} variant="filled" key={`player-${p}`} onDelete={() => removePlayer(p)} />);
  // const ingredientCmps = Object.entries(ingredients).map(([_key]) => {
  //   const key = _key as keyof typeof ingredients;
  //   // TODO
  //   // const onClick = () => {};
  //   const value = settings.ingredients.includes(key) ? 1 : 0;
  //   return (
  //     <Grid item xs={4} key={`available-${key}-${randomBetween(0, 1000)}`}>
  //       <Ingredient kind={key} value={value} />
  //     </Grid>
  //   );
  // });
  // const starterCmps = settings.startDeck.map(({ kind, value }) => (
  //   <ListItem key={`starter-${kind}-${value}-${randomBetween(0, 1000)}`}>{`${kind} (${value})`}</ListItem>
  // ));
  const allAssets = [
    ...Object.values(ingredients).map(({ img }) => img),
    ...Object.values(mechanics).map(({ img }) => img),
    ...Object.values(players).map(({ img }) => img),
    ...potions.map(({ img }) => img),
  ];
  const assetCmps = allAssets.map((src) => <img width={30} src={src} alt="" key={src} />);
  return (
    <Stack direction="column" spacing={1} sx={{ maxWidth, m: 1 }}>

      <Typography variant="h2" textAlign="center" sx={{ zIndex: 1 }}>Brewery</Typography>

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
          <TextIcon img={mechanics.cards.img} rgb={mechanics.cards.rgb} sx={{ width: '1rem', height: '1rem' }} />
          {' Ingredient Cards '}
        </span>
        from your deck. But watch out! If you use more than seven
        <span style={{ whiteSpace: 'nowrap', color: '#c57d54' }}>
          {' '}
          <TextIcon img={ingredients['Fire Lily'].img} rgb="red" sx={{ width: '1rem', height: '1rem' }} />
          {' Fire Lilies '}
        </span>
        your cauldron will explode.
      </Typography>

      <Typography component="div" sx={{ pb: 3 }}>
        Selling your potions will earn you
        <span style={{ whiteSpace: 'nowrap', color: mechanics.currency.rgb }}>
          {' '}
          <CurrencyIcon sx={{ width: '1rem', height: '1rem' }} />
          {' Gold '}
        </span>
        and
        <span style={{ whiteSpace: 'nowrap', color: mechanics.rubies.rgb }}>
          {' '}
          <RubyIcon sx={{ width: '1rem', height: '1rem' }} />
          {' Rubies '}
        </span>
        which can be used to buy more powerful ingredients. Your goal is to collect more
        <span style={{ whiteSpace: 'nowrap', color: mechanics.score.rgb }}>
          {' '}
          <ScoreIcon sx={{ width: '1rem', height: '1rem' }} />
          {' Victory Points '}
        </span>
        than your opponents.
      </Typography>

      <Button
        onClick={() => startGame(playerList)}
        disabled={playerList.length < 1}
        variant="outlined"
        sx={{ maxWidth }}
      >
        {hasPrevGame ? 'Start new Game' : 'Start Game'}
      </Button>

      {
        !hasPrevGame
          ? null
          : (
            <>
              <ButtonGroup variant="outlined">
                <Button
                  onClick={restoreGame}
                  fullWidth
                >
                  Resume Game
                </Button>
                <Button
                  onClick={() => { Store.clearGame(); setHasPrevGame(false); }}
                  size="small"
                >
                  <Delete />
                </Button>
              </ButtonGroup>
              <Typography variant="caption" textAlign="center">{`Previous Game with ${prevPlayers.map(({ name }) => name).join(', ')} - Round ${prevRound}`}</Typography>
            </>
          )
      }

      <div>
        <Typography variant="h4">Players</Typography>
        <Input
          placeholder="New Player"
          endAdornment={addButton}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addPlayer(); }}
          value={newPlayer}
          sx={{ width: '150px' }}
        />
        {playerCmps}
      </div>

      <div>
        <Typography variant="h4">Rounds</Typography>
        <Input
          onChange={({ target: { value } }) => setSettings({ rounds: Number(value) })}
          value={settings.rounds}
          type="number"
          sx={{ width: '150px' }}
        />
      </div>

      {/* <div>
        <Typography variant="h4">Available Ingredients</Typography>
        <Grid container spacing={1}>
          {ingredientCmps}
        </Grid>
      </div>

      <div>
        <Typography variant="h4">Starter Ingredients</Typography>
        <List dense>{starterCmps}</List>
      </div> */}

      <div style={{ height: 0, overflow: 'hidden' }}>
        <Typography variant="h4">Preload Assets</Typography>
        {assetCmps}
      </div>
    </Stack>
  );
};

export default observer(Start);
