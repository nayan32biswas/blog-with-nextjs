import Head from 'next/head';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import styles from '@/styles/Home.module.css';
import { useTheme } from '@mui/material/styles';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts, fetchTopics } from '@/api/postApi';
import PostCard from '@/components/posts/PostCard';
import TopicCard from '@/components/posts/TopicCard';
import { IPostList, ITopicList } from '@/types/api.types';
import { getListApiDefaultValue } from '@/utils';

// This function gets called at build time
export async function getStaticProps() {
  // Fetch data from an API or any data source
  let postData: IPostList = getListApiDefaultValue();
  try {
    postData = await fetchPosts();
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e);
    postData.errorMessage = errorMessage;
  }

  let topicData: ITopicList = getListApiDefaultValue();
  try {
    topicData = await fetchTopics();
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e);
    topicData.errorMessage = errorMessage;
  }

  // Pass the fetched data as props
  return {
    props: {
      postData,
      topicData
    },
    revalidate: 60
  };
}

interface HomeProps {
  postData: IPostList;
  topicData: ITopicList;
}

export default function Home({ postData, topicData }: HomeProps) {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Blog Page</title>
        <meta name="description" content="Home page description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="div" style={{ position: 'relative', width: '100%' }}>
        <Typography
          style={{
            height: '350px',
            width: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgb(39 46 48)' : '#a7cddf'
          }}
        />
        <Typography
          component="div"
          style={{
            position: 'absolute',
            color: 'white',
            top: 10,
            left: '30%',
            transform: 'translateX(-30%)'
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color={theme.palette.primary.main}
            fontWeight={400}
          >
            Open Source Blog
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            color={theme.palette.primary.main}
            fontWeight={400}
          >
            You are welcome to write blog posts also you can use source code
          </Typography>
        </Typography>
      </Typography>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Grid item xs={8} style={{ backgroundColor: '#ffa' }}>
              {[1, 2, 3, 4, 5].map((val, idx) => {
                return <PostCard key={idx} val={val} />;
              })}
            </Grid>
            <Grid item xs={4} style={{ backgroundColor: '#bff' }}>
              {[1, 2].map((val, idx) => {
                return <TopicCard key={idx} val={val} />;
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Grid item xs={8} style={{ backgroundColor: '#0fb' }}>
              {[1, 2, 3, 4, 5].map((val, idx) => {
                return <PostCard key={idx} val={val} />;
              })}
            </Grid>
            <Grid item xs={4} style={{ backgroundColor: '#aaa' }}>
              {[1, 2].map((val, idx) => {
                return <TopicCard key={idx} val={val} />;
              })}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
