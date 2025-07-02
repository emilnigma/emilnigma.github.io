import { Box, Typography } from '@mui/material';
import { RefObject } from 'react';
import mechanics from '../../Assets/Mechanics';

export type PortraitProps = {
    img: string
    frame?: boolean
    text?: string
    refe?: RefObject<HTMLElement>
};

function Portrait({
  img, frame = false, text = '', refe,
}: PortraitProps) {
  if (!frame) {
    return (
      <div style={{
        width: 160,
        height: 160,
        backgroundPosition: 'center',
        backgroundImage: `url("${img}")`,
        backgroundSize: 'cover',
        maskImage: 'radial-gradient(circle at 50%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0.1) 66%, rgba(0, 0, 0, 0) 66%',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(to bottom, transparent, #333, transparent) 1 0 1 0',
        alignContent: 'center',
      }}
      >
        <Typography
          ref={refe}
          variant="h2"
          fontFamily="PT Serif"
          sx={{ textShadow: '0px 3px 3px #0000008a' }}
        >
          {text}
        </Typography>
      </div>
    );
  }
  return (
    <Box sx={{
      width: 200, display: 'flex', justifyContent: 'center',
    }}
    >
      <div
        style={{
          height: 200,
          width: 200,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: '-38px',
          backgroundPosition: 'center',
          backgroundImage: `url("${mechanics.frame.img}")`,
          backgroundSize: 'cover',
        }}
      >
        <div style={{
          width: '90%',
          height: '90%',
          marginTop: '2px',
          backgroundPosition: 'center',
          backgroundImage: `url("${img}")`,
          backgroundSize: 'cover',
          maskImage: 'radial-gradient(circle at 50%, rgba(0, 0, 0, 1) 52%, transparent 56%)',
        }}
        />
      </div>
    </Box>
  );
}

export default Portrait;
