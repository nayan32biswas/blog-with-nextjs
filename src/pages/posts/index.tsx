import Head from 'next/head';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fetchPosts } from '@/api/postApi';

function Post({ postData }: any) {
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
          <Typography component="h1" variant="h4" gutterBottom>
            Project Init: Total Post {postData.count}
          </Typography>
          <Link href="/" color="secondary">
            Go to the home page
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Post;

export async function getServerSideProps(SSContext: any) {
  // Fetch data from an API or any data source
  const postData = await fetchPosts(SSContext);

  // Pass the fetched data as props
  return {
    props: {
      postData
    }
  };
}
