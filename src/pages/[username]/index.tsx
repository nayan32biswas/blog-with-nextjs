import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { getPublicUserProfile } from '@/api/userApi';
import CommonErrorPage from '@/components/utils/CommonErrorPage';
import Loading from '@/components/utils/Loading';
import { IMinimalUser } from '@/types/api.types';

function getUsername(router: NextRouter): string {
  let username = router.query.username;
  if (username && typeof username === 'string') {
    username = username.split('@').at(-1);
  }
  if (!username || typeof username !== 'string') {
    return '';
  }
  return username;
}
interface IPageInfo {
  hasMorePost: boolean;
  errorMessage: string;
  notFound: string;
}

function UserProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = React.useState<IMinimalUser | null>(null);
  const [pageInfo, setPageInfo] = React.useState<IPageInfo>({
    hasMorePost: false,
    errorMessage: '',
    notFound: ''
  });
  const username = getUsername(router);

  React.useEffect(() => {
    if (!username) return;

    const fetchData = async (username: string) => {
      try {
        const userProfile = await getPublicUserProfile({ username });
        setUserProfile(userProfile);
      } catch (e: any) {
        const { message: errorMessage, status } = handleAxiosError(e);
        console.log(errorMessage, status);
        if (status === 404) {
          setPageInfo((prevState) => ({ ...prevState, errorMessage }));
        }
        setPageInfo((prevState) => ({ ...prevState, errorMessage }));
      }
    };
    fetchData(username);
  }, [username]);

  if (pageInfo.errorMessage) {
    return <CommonErrorPage message={pageInfo.errorMessage} />;
  }
  if (!userProfile) {
    return <Loading />;
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
