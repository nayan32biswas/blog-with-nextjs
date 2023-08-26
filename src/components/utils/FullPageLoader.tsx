import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

const FullPageLoader = ({ loading }: { loading: boolean }) => {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullPageLoader;
