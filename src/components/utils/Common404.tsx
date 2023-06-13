import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Common404({ message }: { message: string }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography component="span" fontSize={30}>
          404 |{' '}
        </Typography>
        <Typography component="span" fontSize={20}>
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Common404;
