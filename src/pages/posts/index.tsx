import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts } from '@/api/postApi';
import { IPostList } from '@/types/api.types';
import { getListApiDefaultValue } from '@/utils';

export async function getServerSideProps(SSContext: GetServerSidePropsContext) {
  // Get Post data on server side
  let postData: IPostList = getListApiDefaultValue();
  try {
    postData = await fetchPosts({ SSContext, params: { page: 1, limit: 50 } });
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e, SSContext);
    postData.errorMessage = errorMessage;
  }

  // Pass the fetched data as props
  return {
    props: {
      postData
    }
  };
}

function Post({ postData }: { postData: IPostList }) {
  return (
    <>
      <Head>
        <title>Blog Posts App</title>
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
          {postData?.errorMessage ? (
            <Typography component="h1" variant="h4">
              {postData?.errorMessage}
            </Typography>
          ) : (
            <Typography component="h1" variant="h4" gutterBottom>
              Total Post {postData?.count}
            </Typography>
          )}
          <Link href="/" color="secondary">
            Go to the home page
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Post;
