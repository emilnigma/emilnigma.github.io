import { observer } from 'mobx-react';
import {
  Box, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';
import { glass } from './Progress';

function Capacity() {
  const {
    capacity, capacityMax, capacityIsFail,
    tooltip, tooltipSet,
  } = useStore();
  const capacityColor = capacityIsFail() ? '#b92c29' : mechanics.phase.rgb;
  const indicators = [...Array(capacityMax).keys()].map((i) => {
    const isActive = i < capacity;
    return (
      <span
        key={`capacity-indicator-${i}`}
        style={{
          width: `${100 / capacityMax}%`,
          height: '15px',
          backgroundColor: '#333',
          position: 'relative',
          overflow: 'hidden',
          display: 'block',
          borderRadius: '8px',
          backgroundImage: glass,
        }}
      >
        <span style={{
          width: isActive ? '100%' : '0%',
          height: '15px',
          backgroundColor: capacityColor,
          position: 'relative',
          overflow: 'hidden',
          display: 'block',
          borderRadius: '8px',
          transition: 'width 1s',
          backgroundImage: glass,
        }}
        />
      </span>
    );
  });
  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5" flexGrow={1}>Volume</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'capacity' ? 'none' : 'capacity')}>
          {tooltip === 'capacity'
            ? <RemoveCircleOutlineOutlinedIcon htmlColor="white" />
            : <HelpOutlineIcon htmlColor="white" />}
        </IconButton>
      </Stack>
      <Collapse in={tooltip === 'capacity'}>
        <ul style={{ margin: 1 }}>
          <li>{`Ingredients currently in cauldron: ${capacity}`}</li>
          <li>{`Maximum Capacity: ${capacityMax}`}</li>
        </ul>
        <Typography sx={{ mb: 1 }}>
          If the volume in the cauldron reaches its
          <Typography color={capacityColor} component="span">{' maximum capacity '}</Typography>
          you need to sell your potion or start over. Naturally, a larger volume is of greater value.
        </Typography>
      </Collapse>
      <Stack direction="row" sx={{ position: 'relative' }}>
        {indicators}
        <span style={{
          width: '15px',
          height: '15px',
          position: 'absolute',
          left: `min(max(8px, calc(${(capacity * 100) / capacityMax}% - 8px)), calc(100% - 8px))`,
          backgroundColor: 'white',
          transform: 'translate(-50%, 0%)',
          borderRadius: '8px',
          transition: 'left 1s',
        }}
        />
      </Stack>
      {/* <span style={{
        width: '100%',
        height: '15px',
        backgroundColor: '#333',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        borderRadius: '8px',
      }}
      >
        <span style={{
          width: `${(capacity * 100) / capacityMax}%`,
          minWidth: '8px',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          transformOrigin: 'left',
          transition: 'width 1s',
          backgroundColor: capacityColor,
        // backgroundImage: 'linear-gradient(to left, white, transparent)',
        // backgroundSize: '15px',
        // backgroundRepeat: 'no-repeat',
        // backgroundPositionX: '100%',
        }}
        />
        <span style={{
          width: '15px',
          height: '15px',
          position: 'absolute',
          left: `min(max(8px, ${(capacity * 100) / capacityMax}%), calc(100% - 8px))`,
          backgroundColor: 'white',
          transform: 'translate(-50%, 0%)',
          borderRadius: '8px',
          transition: 'left 1s',
        }}
        />
      </span> */}
    </Box>
  );
}

export default observer(Capacity);
