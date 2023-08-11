import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { getPublicUserProfile } from '@/api/userApi';
import { IMinimalUser } from '@/types/api.types';

function UserProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = React.useState<IMinimalUser | null>(null);

  React.useEffect(() => {
    let username = router.query.username;
    if (username && typeof username === 'string') {
      username = username.split('@').at(-1);
    }
    if (!username || typeof username !== 'string') {
      return;
    }

    const fetchData = async (username: string) => {
      try {
        const userProfile = await getPublicUserProfile({ username });
        setUserProfile(userProfile);
      } catch (e: any) {
        const { message: errorMessage, status } = handleAxiosError(e);
        console.log(errorMessage, status);
        if (status === 404) {
          router.push('/404');
        }
        console.log(errorMessage);
      }
    };
    fetchData(username).catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e);
    });
  }, [router]);

  if (!userProfile) {
    return (
      <Typography component="h1" variant="h4">
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Head>
        <title>{userProfile.full_name}</title>
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

export default UserProfile;
