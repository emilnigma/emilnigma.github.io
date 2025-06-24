import { observer } from 'mobx-react';
import {
  Box, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';

const progressColor = mechanics.phase.rgb;

function Progress() {
  const {
    rollTheme,
    progress, progressMax,
    tooltip, tooltipSet,
  } = useStore();

  const indicators = [...Array(progressMax).keys()].map((i) => {
    const isActive = i < progress;
    return (
      <span style={{
        width: `${100 / progressMax}%`,
        height: '15px',
        backgroundColor: '#333',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        borderRadius: '8px',
      }}
      >
        <span style={{
          width: isActive ? '100%' : '0%',
          height: '15px',
          backgroundColor: progressColor,
          position: 'relative',
          overflow: 'hidden',
          display: 'block',
          borderRadius: '8px',
          transition: 'width 1s',
        }}
        />
      </span>
    );
  });

  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5" flexGrow={1}>Progress</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'progress' ? 'none' : 'progress')}>
          {tooltip === 'progress'
            ? <RemoveCircleOutlineOutlinedIcon htmlColor="white" />
            : <HelpOutlineIcon htmlColor="white" />}
        </IconButton>
      </Stack>
      <Collapse in={tooltip === 'progress'}>
        <ul style={{ margin: 1 }}>
          <li>{`Current progress: ${progress}`}</li>
          <li>{`Goal: ${progressMax}`}</li>
        </ul>
        <Typography sx={{ mb: 1 }}>
          To successfully brew a health potion you need to roll
          <Typography color={progressColor} component="span">{` ${rollTheme[0]} ≥ ${rollTheme[1]} `}</Typography>
          {`${progressMax} times. Once you have reached the goal you will be able to sell your potion.`}
        </Typography>
      </Collapse>
      <Stack direction="row">
        {...indicators}
      </Stack>
    </Box>
  );
}

export default observer(Progress);
