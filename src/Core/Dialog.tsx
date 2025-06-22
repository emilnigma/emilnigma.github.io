/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Modal, ModalProps, SxProps,
} from '@mui/material';

const style: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '600px',
  width: 'calc(100% - 40px)',
  bgcolor: '#300',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function Dialog(props: ModalProps) {
  const { children, ...restProps } = props;
  return (
    <Modal {...restProps} slotProps={{ backdrop: { sx: { backdropFilter: 'blur(3px)' } } }}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
}

export default Dialog;
