import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { getPublicUserProfile } from '@/api/userApi';
import UserPostLists from '@/components/posts/UserPostLists';
import CommonErrorPage from '@/components/utils/CommonErrorPage';
import Loading from '@/components/utils/Loading';
import { IMinimalUser } from '@/types/api.types';
import { getFileUrl } from '@/utils';
import { getUsername } from '@/utils/urlParser';

function UserProfile() {
  const router = useRouter();
  const theme = useTheme();
  const [userProfile, setUserProfile] = React.useState<IMinimalUser | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const username = React.useMemo(() => getUsername(router), [router]);

  React.useEffect(() => {
    if (!username || userProfile) return;

    const fetchData = async (username: string) => {
      try {
        const userProfile = await getPublicUserProfile({ username });
        setUserProfile(userProfile);
      } catch (e: any) {
        const { message: userErrorMessage } = handleAxiosError(e);
        setErrorMessage(userErrorMessage);
      }
    };
    fetchData(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (errorMessage) {
    return <CommonErrorPage message={errorMessage} />;
  }

  return (
    <>
      <Head>
        {userProfile ? <title>{userProfile.full_name}</title> : <title>User Profile</title>}
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            mx: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {username ? <UserPostLists username={username} /> : <Loading />}
            </Grid>
            <Grid item xs={4}>
              {userProfile ? (
                <div>
                  <Avatar
                    sx={{
                      bgcolor: red[500],
                      width: theme.spacing(30),
                      height: theme.spacing(30)
                    }}
                    src={getFileUrl(userProfile.image)}
                  >
                    {userProfile.full_name[0]}
                  </Avatar>
                  <span>{userProfile.full_name}</span>
                </div>
              ) : (
                <Loading />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default UserProfile;
