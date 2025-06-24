import { Box, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../Core/Store';

const sx = {
  borderRadius: '8px',
  textAlign: 'center',
};

function Rolls() {
  const { rollTheme, rollLeft, rollRight } = useStore();
  const sign = rollLeft === 0 && rollRight === 0 ? '' : rollLeft > rollRight ? '>' : rollLeft < rollRight ? '<' : '=';

  return (
    <Stack direction="row" sx={{ borderWidth: '2px', borderStyle: 'solid', borderImage: 'linear-gradient(to right, transparent, #333, transparent) 1 0 1 0' }}>
      <Box flexGrow={1} sx={{ ...sx, width: '30%' }}>
        <Typography textAlign="right">{ rollTheme[0] }</Typography>
        <Typography textAlign="right" variant="h3">
          { rollLeft === 0 && rollRight === 0 ? '?' : rollLeft}
        </Typography>
        <Typography textAlign="right">Roll between 1 and 6</Typography>
      </Box>
      <Box sx={{ ...sx, width: '45px', pt: '1.4em' }}>
        <Typography variant="h3">{sign}</Typography>
      </Box>
      <Box flexGrow={1} sx={{ ...sx, width: '30%' }}>
        <Typography textAlign="left">{ rollTheme[1] }</Typography>
        <Typography textAlign="left" variant="h3">
          { rollLeft === 0 && rollRight === 0 ? '?' : rollRight}
        </Typography>
        <Typography textAlign="left">Roll between 1 and 6</Typography>
      </Box>
    </Stack>
  );
}

export default observer(Rolls);

// --rich-black: #001219ff;
// --midnight-green: #005f73ff;
// --dark-cyan: #0a9396ff;
// --tiffany-blue: #94d2bdff;
// --vanilla: #e9d8a6ff;
// --gamboge: #ee9b00ff;
// --alloy-orange: #ca6702ff;
// --rust: #bb3e03ff;
// --rufous: #ae2012ff;
// --auburn: #9b2226ff;
