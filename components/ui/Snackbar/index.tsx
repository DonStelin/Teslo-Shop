import { forwardRef, SyntheticEvent } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearSnackbar } from '@store/ui';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbar = () => {
  const dispatch = useAppDispatch();
  const { snackbar } = useAppSelector((state) => state.ui);

  const { isOpen, message, type } = snackbar;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          className="fadeIn"
          onClose={handleClose}
          severity={type || 'info'}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
