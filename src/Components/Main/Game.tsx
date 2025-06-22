import { observer } from 'mobx-react';
import Brew from '../Board/Brew';

function Game() {
  return (
    <Brew />
  );
};

export default observer(Game);
