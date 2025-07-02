import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';

function Quality() {
  const { quality } = useStore();
  const [gold, silver, copper] = quality;
  const qualityString = `${gold > 0 ? `${gold} G ` : ''}${gold > 0 || silver > 0 ? `${silver} S ` : ''}${`${copper} C`}`;

  return (
    <span style={{
      width: '100%',
      height: '15px',
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
      borderRadius: '8px',
    }}
    >
      <Typography fontSize="10pt" sx={{ textAlign: 'center', translate: '0 -2px' }}>{qualityString}</Typography>
    </span>
  );
}

export default observer(Quality);
