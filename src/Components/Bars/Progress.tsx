import { observer } from 'mobx-react';
import {
  Box, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';

export const glass = 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(255,255,255,0.1) 30%, transparent 50%, rgba(255,255,255,0.03))';
const progressColor = mechanics.phase.rgb;

function Progress() {
  const {
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
        backgroundImage: glass,
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
          backgroundImage: glass,
        }}
        />
      </span>
    );
  });

  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5">Progress</Typography>
        <Typography color={progressColor} flexGrow={1}>{`${progress}/${progressMax}`}</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'progress' ? 'none' : 'progress')}>
          {tooltip === 'progress'
            ? <RemoveCircleOutlineOutlinedIcon htmlColor="white" />
            : <HelpOutlineIcon htmlColor="white" />}
        </IconButton>
      </Stack>
      <Collapse in={tooltip === 'progress'}>
        <Typography sx={{ mb: 1 }}>
          When your left dice shows a number that is
          <Typography color={progressColor} component="span">{' higher or equal '}</Typography>
          to the left number your progress is advanced by 1. Once your progress bar is filled you are able to finish and sell your potion.
        </Typography>
      </Collapse>
      <Stack direction="row" sx={{ position: 'relative' }}>
        {...indicators}
        <span style={{
          width: '15px',
          height: '15px',
          position: 'absolute',
          left: `min(max(8px, calc(${(progress * 100) / progressMax}% - 8px)), calc(100% - 8px))`,
          backgroundColor: 'white',
          transform: 'translate(-50%, 0%)',
          borderRadius: '8px',
          transition: 'left 1s',
        }}
        />
      </Stack>
    </Box>
  );
}

export default observer(Progress);
