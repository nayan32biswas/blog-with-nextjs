import React from 'react';

import Snackbar from '@mui/material/Snackbar';

interface SnackbarProps {
  message?: string | null;
}
function SnackbarCenter({ message }: SnackbarProps) {
  const [open, setClose] = React.useState(true);

  if (!message) return null;

  const handleClose = () => {
    setClose(false);
  };

  const vertical = 'top';
  const horizontal = 'center';

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
}

export default SnackbarCenter;
