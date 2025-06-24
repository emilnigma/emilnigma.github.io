import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brew from '../Board/Brew';
import Ingredients from '../Board/Ingredients';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';

const pageMapping = {
  // menu: <Menu />,
  brew: <Brew />,
  ingredients: <Ingredients />,
};
export type Page = keyof typeof pageMapping;

function Game() {
  const { page } = useStore();
  return (
    <Stack direction="column" spacing={1} sx={{ m: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography textAlign="left" sx={{ color: mechanics.phase.rgb }}>
          <ArrowBackIcon />
          Back
        </Typography>
        <Typography textAlign="center">I - Healing Potion</Typography>
        <Typography textAlign="right">.</Typography>
      </Stack>
      { pageMapping[page] }
    </Stack>
  );
};

export default observer(Game);
