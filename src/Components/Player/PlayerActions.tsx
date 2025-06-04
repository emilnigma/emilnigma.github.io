import { useState } from 'react';
import {
  Button, Card, List, ListItem, Stack, Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';
import potions from '../../Assets/Potions';
import { CurrencyIcon, EmeraldIcon, ScoreIcon } from '../TextIcon';
import ingredients from '../../Assets/Ingredients';
import { GRID_HEIGHT } from '../Board/Board';

// BREWING PHASE
const PlayerBrewingActions = observer(() => {
  const store = useStore();
  const {
    chipsInBag, chipsOnBoard, pickChip, createPotion, effects: { hasDilute = false, fireResistance = 7 }, dilute,
  } = store.player;

  const numberOfWhites = chipsOnBoard
    .filter(({ chip }) => chip.kind === 'Fire Lily')
    .reduce((sum, { chip }) => sum + chip.value, 0);
  const isCauldronExploded = numberOfWhites > fireResistance;
  const isBagEmpty = chipsInBag.length === 0;
  const isBoardEmpty = chipsOnBoard.length === 0;
  return (
    <>
      {!isCauldronExploded ? null : (
        <Typography>{`Your cauldron exploded due to ${numberOfWhites} Fire Lilies. Your Fire Resistance is ${fireResistance} and can be increased at the Marketplace.`}</Typography>
      )}
      {!isBagEmpty ? null : (
        <Typography>There are no more Ingredients left.</Typography>
      )}
      {isCauldronExploded || isBagEmpty ? null : (
        <Button
          onClick={pickChip}
          variant="outlined"
          // sx={{ justifyContent: 'center' }}
        >
          <img src={mechanics.cards.img} height={GRID_HEIGHT - 18} alt="" />
        </Button>
      )}
      {isCauldronExploded || isBoardEmpty || !hasDilute ? null : (
        <Button
          onClick={dilute}
          variant="outlined"
        >
          Dilute
        </Button>
      )}
      {isBoardEmpty ? null : (
        <Button
          onClick={createPotion}
          variant="outlined"
          color={isCauldronExploded ? 'error' : undefined}
        >
          Finish Potion
        </Button>
      )}
    </>
  );
});

// SELL PHASE
const PlayerSellActions = observer(() => {
  const store = useStore();
  const {
    chipsOnBoard, claimGems, claimCurrency, claimScore, advancePhase, potion, effects: { fireResistance = 7 },
  } = store.player;
  const numberOfWhites = chipsOnBoard
    .filter(({ chip }) => chip.kind === 'Fire Lily')
    .reduce((sum, { chip }) => sum + chip.value, 0);
  const isCauldronExploded = numberOfWhites > fireResistance;
  if (isCauldronExploded) {
    return (
      <>
        <ListItem sx={{ justifyContent: 'center' }}>
          <img src={potions[0].img} height="120px" alt="" />
        </ListItem>
        <Typography>{potions[0].description}</Typography>
        <Stack direction="row" spacing={1}>
          <Card
            elevation={0}
            sx={{
              width: '50%', border: `1px solid ${mechanics.score.rgb}`, cursor: 'pointer', justifyContent: 'center',
            }}
            onClick={() => { claimGems(); claimScore(); advancePhase(); }}
          >
            <Stack direction="row" spacing={-1.7} justifyContent="center">
              <ScoreIcon large />
              <EmeraldIcon large />
            </Stack>
            <Button fullWidth sx={{ color: mechanics.score.rgb }}>
              Victory Points
            </Button>
          </Card>
          <Card
            elevation={0}
            sx={{
              width: '50%', border: `1px solid ${mechanics.currency.rgb}`, cursor: 'pointer', justifyContent: 'center',
            }}
            onClick={() => { claimGems(); claimCurrency(); advancePhase(); }}
          >
            <Stack direction="row" spacing={-1.7} justifyContent="center">
              <CurrencyIcon large />
              <EmeraldIcon large />
            </Stack>
            <Button fullWidth sx={{ color: mechanics.currency.rgb }}>
              Gold
            </Button>
          </Card>
        </Stack>
      </>
    );
  }
  const sell = () => {
    claimCurrency();
    claimGems();
    claimScore();
    advancePhase();
  };
  const { img, description } = potions[potion];
  return (
    <>
      <ListItem sx={{ justifyContent: 'center', pb: 0 }}>
        <img src={img} height="180px" alt="" />
      </ListItem>
      <Typography>{description}</Typography>
      <Button fullWidth variant="outlined" onClick={sell}>Sell Potion</Button>
    </>
  );
});

// EFFECT PHASE
const PlayerEffectsActions = observer(() => {
  const [claimed, setClaimed] = useState<string[]>([]);
  const store = useStore();
  const { advancePhase } = store.player;
  const ingredientsWithEffects = Object.entries(ingredients)
    .filter((ing) => ing[1].condition !== undefined && ing[1].afterPickEffect !== undefined);
  const effectCmps = ingredientsWithEffects.map(([name, value]) => (!value.condition!() ? null : (
    <Button
      key={`ingredient-effect-${name}`}
      fullWidth
      variant="outlined"
      disabled={claimed.includes(name)}
      sx={{ color: 'white' }}
      onClick={() => { setClaimed([...claimed, name]); value.afterPickEffect!(); }}
    >
      Clover Leaf
    </Button>
  )));
  return (
    <>
      {effectCmps}
      <Button fullWidth variant="outlined" onClick={() => advancePhase()}>Continue to Marketplace</Button>
    </>
  );
});

// SHOPPING PHASE
const PlayerShopActions = observer(() => {
  const { exitShop, chipsInShoppingCart } = useStore().player;
  const ingredientsCmps = chipsInShoppingCart.map((c, i) => (typeof c === 'string'
    ? (
    // eslint-disable-next-line react/no-array-index-key
      <ListItem key={`shopping-cart-${i}`}>{c}</ListItem>
    )
    : (
    // eslint-disable-next-line react/no-array-index-key
      <ListItem key={`shopping-cart-${i}`}>{`${c.kind} ${c.value}★`}</ListItem>
    )));
  return (
    <>
      {chipsInShoppingCart.length === 0 ? null : <List dense>{ingredientsCmps}</List>}
      <Button fullWidth variant="outlined" onClick={() => exitShop()}>Exit Marketplace</Button>
    </>
  );
});

// DONE PHASE
const PlayerDoneActions = observer(() => {
  const {
    startNewRound, round, settings,
  } = useStore();
  const isGameOver = round >= settings.rounds;
  const rankingHeader = isGameOver ? 'Winners' : 'Ranking';
  return (
    <>
      <Typography textAlign="center">{rankingHeader}</Typography>
      {
      isGameOver
        ? null
        : <Button variant="outlined" onClick={startNewRound}>Start next round</Button>
      }

    </>
  );
});

function PlayerActions() {
  const store = useStore();
  const { phase } = store.player;
  if (phase === 1) return <PlayerBrewingActions />;
  if (phase === 2) return <PlayerSellActions />;
  if (phase === 3) return <PlayerEffectsActions />;
  if (phase === 4) return <PlayerShopActions />;
  return <PlayerDoneActions />;
}

export default observer(PlayerActions);
