import ErrorIcon from '@mui/icons-material/Error';
import { observer } from 'mobx-react';
import {
  Box, Chip, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStore } from '../../Core/Store';

const stabilityColor = 'coral';

function Stability() {
  const {
    stability,
    stabilityRightBound, stabilityRightMax,
    stabilityLeftBound, stabilityLeftMax,
    tooltip, tooltipSet,
  } = useStore();

  const stabilityRightBoundPercentage = (100 * (stabilityRightBound - stabilityLeftMax)) / (stabilityRightMax - stabilityLeftMax);
  const stabilityLeftBoundPercentage = (100 * (stabilityLeftBound - stabilityLeftMax)) / (stabilityRightMax - stabilityLeftMax);
  const stabilityPercentage = (100 * (stability - stabilityLeftMax)) / (stabilityRightMax - stabilityLeftMax);
  const isStable = stability <= stabilityLeftBound && stability >= stabilityRightBound;
  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5" flexGrow={1}>Stability</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'stability' ? 'none' : 'stability')}>
          <HelpOutlineIcon htmlColor={tooltip === 'stability' ? stabilityColor : 'white'} />
        </IconButton>
      </Stack>
      <span style={{
        width: '100%',
        height: '15px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        // backgroundImage: `linear-gradient(to right, transparent 0%, transparent ${stabilityLeftBoundPercentage}%, ${mechanics.phase.rgb} calc(${stabilityLeftBoundPercentage}% + 3px), ${mechanics.phase.rgb} calc(${stabilityRightBoundPercentage}% - 3px), transparent ${stabilityRightBoundPercentage}%, transparent 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        borderRadius: '8px',
      }}
      >
        <span style={{
          width: `${stabilityLeftBoundPercentage}%`,
          height: '15px',
          display: 'inline-block',
          textAlign: 'right',
          backgroundColor: 'rgba(255,0,0,0.2)',
        }}
        >
          <ErrorIcon htmlColor="crimson" sx={{ height: '17px', translate: '12.3px -1.3px' }} />
        </span>
        <span style={{
          width: `max(0%, ${stabilityPercentage - 50}%)`,
          left: '50%',
          height: '15px',
          display: 'inline-block',
          backgroundColor: isStable ? stabilityColor : 'crimson',
          position: 'absolute',
          transition: 'width 1s 1.2s, background-color 0.5s 2.2s',
        }}
        />
        <span style={{
          width: `max(0%, ${50 - stabilityPercentage}%)`,
          right: '50%',
          height: '15px',
          display: 'inline-block',
          backgroundColor: isStable ? stabilityColor : 'crimson',
          position: 'absolute',
          transition: 'width 1s 1.2s, background-color 0.4s 2.0s',
        }}
        />
        <span style={{
          width: `${stabilityLeftBoundPercentage}%`,
          height: '15px',
          position: 'absolute',
          left: `${stabilityRightBoundPercentage}%`,
          display: 'inline-block',
          textAlign: 'left',
          backgroundColor: 'rgba(255,0,0,0.2)',
        }}
        >
          <ErrorIcon htmlColor="crimson" sx={{ height: '17px', translate: '-12.3px -1.3px' }} />
        </span>
        <span style={{
          width: '15px',
          height: '15px',
          position: 'absolute',
          left: `min(max(8px, ${stabilityPercentage}%), calc(100% - 8px))`,
          backgroundColor: 'white',
          transform: 'translate(-50%, 0%)',
          borderRadius: '8px',
          transition: 'left 1s 1.2s',
        }}
        />
      </span>
      <Collapse in={tooltip === 'stability'}>
        <ul style={{ margin: 1 }}>
          <li>{`Current value: ${stability}`}</li>
          <li>{`Stable between ${stabilityLeftBound} and ${stabilityRightBound}`}</li>
        </ul>
        <Typography>
          Whenever the light number is larger than the shadow number the stability indicator will move left (and vice versa). Keep the indicator away from the red zones and your potion remains stable. Failing to do so will cause the cauldron to explode.
          <Chip
            clickable
            onClick={() => tooltipSet('none')}
            label="OK"
            size="small"
            sx={{ ml: 1, color: stabilityColor, border: `1px solid ${stabilityColor}` }}
          />
        </Typography>
      </Collapse>
    </Box>
  );
}

export default observer(Stability);
