import { useState } from 'react';
import {
  Button, Chip, IconButton, Input, Stack, Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import ingredients from '../../Assets/Ingredients';
import mechanics from '../../Assets/Mechanics';
import players from '../../Assets/Players';
import potions from '../../Assets/Potions';

const maxWidth = '500px';

function Start() {
  const { startGame, settings, setSettings } = useStore();
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
    <Stack direction="column" spacing={3} sx={{ maxWidth, m: 1 }}>
      <Typography variant="h2" textAlign="center">Brewery</Typography>

      <Button
        onClick={() => startGame(playerList)}
        disabled={playerList.length < 1}
        variant="contained"
        sx={{ maxWidth }}
      >
        Start Game
      </Button>

      <div>
        <Typography variant="h4">Players</Typography>
        <Input
          placeholder="New Player Name"
          endAdornment={addButton}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addPlayer(); }}
          value={newPlayer}
          sx={{ width: '200px' }}
        />
        {playerCmps}
      </div>

      <div>
        <Typography variant="h4">Rounds</Typography>
        <Input
          onChange={({ target: { value } }) => setSettings({ rounds: Number(value) })}
          value={settings.rounds}
          type="number"
          sx={{ width: '200px' }}
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
