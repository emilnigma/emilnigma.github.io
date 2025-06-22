import { observer } from 'mobx-react';
import {
  Box, Chip, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStore } from '../../Core/Store';

const capacityColor = 'goldenrod';

function Capacity() {
  const {
    capacity, capacityMax,
    tooltip, tooltipSet,
  } = useStore();
  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5" flexGrow={1}>Volume</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'capacity' ? 'none' : 'capacity')}>
          <HelpOutlineIcon htmlColor={tooltip === 'capacity' ? capacityColor : 'white'} />
        </IconButton>
      </Stack>
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
      </span>
      <Collapse in={tooltip === 'capacity'}>
        <ul style={{ margin: 1 }}>
          <li>{`Ingredients currently in cauldron: ${capacity}`}</li>
          <li>{`Maximum Capacity: ${capacityMax}`}</li>
        </ul>
        <Typography>
          If the volume in the cauldron reaches its
          <Typography color={capacityColor} component="span">{' maximum capacity '}</Typography>
          you need to sell your potion or start over. Naturally, a larger volume is of greater value.
          <Chip
            clickable
            onClick={() => tooltipSet('none')}
            label="OK"
            size="small"
            sx={{ ml: 1, color: capacityColor, border: `1px solid ${capacityColor}` }}
          />
        </Typography>
      </Collapse>
    </Box>
  );
}

export default observer(Capacity);
