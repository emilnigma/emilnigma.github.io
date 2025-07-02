import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { useStore } from '../../Core/Store';
import Start from './Start';
import Brew from '../Board/Brew';
import Ingredients from '../Board/Ingredients';

const pageMapping = {
  start: <Start />,
  brew: <Brew />,
  ingredients: <Ingredients />,
};
export type Page = keyof typeof pageMapping;

function Game() {
  const { page } = useStore();
  return (
    <Stack direction="column" spacing={1} sx={{ m: 1 }}>
      { pageMapping[page] }
    </Stack>
  );
};

export default observer(Game);
