import { observer } from 'mobx-react';
import {
  Box, Collapse, IconButton, Stack, Typography,
} from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStore } from '../../Core/Store';
import mechanics from '../../Assets/Mechanics';

const stabilityColor = mechanics.phase.rgb;
const stabilityColorBg = `${stabilityColor}43`;

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
  // const isStable = stability <= stabilityLeftBound && stability >= stabilityRightBound;
  return (
    <Box>
      <Stack direction="row">
        <Typography variant="h5" flexGrow={1}>Stability</Typography>
        <IconButton onClick={() => tooltipSet(tooltip === 'stability' ? 'none' : 'stability')}>
          {tooltip === 'stability'
            ? <RemoveCircleOutlineOutlinedIcon htmlColor="white" />
            : <HelpOutlineIcon htmlColor="white" />}
        </IconButton>
      </Stack>
      <Collapse in={tooltip === 'stability'}>
        <ul style={{ margin: 0 }}>
          <li>{`Current value: ${stability}`}</li>
          <li>{`Stable between ${stabilityLeftBound} and ${stabilityRightBound}`}</li>
        </ul>
        <Typography sx={{ mb: 1 }}>
          Whenever the light number is larger than the shadow number the stability indicator will move left (and vice versa). Keep the indicator away from the
          <Typography color="orange" component="span">{' danger zones '}</Typography>
          <LocalFireDepartmentIcon htmlColor="orange" sx={{ height: '17px', translate: '-2px 3px' }} />
          and your potion remains stable. Failing to do so will cause the cauldron to explode.
        </Typography>
      </Collapse>
      <span style={{
        width: '100%',
        height: '15px',
        backgroundColor: '#333',
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
          backgroundColor: stabilityColorBg,
        }}
        >
          <LocalFireDepartmentIcon htmlColor="orange" sx={{ height: '17px', translate: '12.3px -1.3px' }} />
        </span>
        <span style={{
          width: `max(0%, ${stabilityPercentage - 50}%)`,
          left: '50%',
          height: '15px',
          display: 'inline-block',
          backgroundColor: stabilityColor,
          position: 'absolute',
          transition: 'width 1s',
        }}
        />
        <span style={{
          width: `max(0%, ${50 - stabilityPercentage}%)`,
          right: '50%',
          height: '15px',
          display: 'inline-block',
          backgroundColor: stabilityColor,
          position: 'absolute',
          transition: 'width 1s',
        }}
        />
        <span style={{
          width: `${stabilityLeftBoundPercentage}%`,
          height: '15px',
          position: 'absolute',
          left: `${stabilityRightBoundPercentage}%`,
          display: 'inline-block',
          textAlign: 'left',
          backgroundColor: stabilityColorBg,
        }}
        >
          <LocalFireDepartmentIcon htmlColor="orange" sx={{ height: '17px', translate: '-12.3px -1.3px' }} />
        </span>
        <span style={{
          width: '15px',
          height: '15px',
          position: 'absolute',
          left: `min(max(8px, ${stabilityPercentage}%), calc(100% - 8px))`,
          backgroundColor: 'white',
          transform: 'translate(-50%, 0%)',
          borderRadius: '8px',
          transition: 'left 1s',
        }}
        />
      </span>
    </Box>
  );
}

export default observer(Stability);
