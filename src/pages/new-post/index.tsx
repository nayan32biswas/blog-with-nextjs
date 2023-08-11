import Head from 'next/head';
import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function NewPosts() {
  return (
    <>
      <Head>
        <title>Write your post here</title>
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            ...
          </Grid>
          <Grid item xs={6}>
            ...
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default NewPosts;
