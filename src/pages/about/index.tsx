import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

function About() {
  return (
    <>
      <Head>
        <title>About Blog App</title>
        <meta name="description" content="This is about page for blog app" />
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Project Init: About Page
          </Typography>
          <Link href="/" color="secondary">
            Go to the home page
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default About;
