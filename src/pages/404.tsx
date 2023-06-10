import Head from 'next/head';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function PageNotFound404() {
  return (
    <>
      <Head>
        <title>404 Page not Found</title>
      </Head>
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
            This page could not be found.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
