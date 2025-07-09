// import { ReactNode, RefObject } from 'react';
import mechanics from '../../Assets/Mechanics';

export type PortraitProps = {
    img: string
    // frame?: boolean
    // text?: string
    // refe?: RefObject<HTMLElement>
    // children?: ReactNode
};

function Portrait({ img }: PortraitProps) {
  return (
    <div
      style={{
        height: 200,
        width: 200,
        flexGrow: 1,
        display: 'grid',
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
  );
}

export default Portrait;
