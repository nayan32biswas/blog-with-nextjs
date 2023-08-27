import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts, fetchTopics } from '@/api/postApi';
import PostCard from '@/components/posts/PostCard';
import Topic from '@/components/posts/Topic';
import { IPostList, ITopicList } from '@/types/api.types';
import { getListApiDefaultValue } from '@/utils';

export async function getStaticProps() {
  let postData: IPostList = getListApiDefaultValue();
  try {
    postData = await fetchPosts({ params: { page: 1, limit: 50 } });
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e);
    postData.errorMessage = errorMessage;
  }

  let topicData: ITopicList = getListApiDefaultValue();
  try {
    topicData = await fetchTopics({ params: { page: 1, limit: 50 } });
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e);
    topicData.errorMessage = errorMessage;
  }

  return {
    props: {
      postData,
      topicData
    },
    revalidate: 60 // this page will expire withing 1 minute.
  };
}

const classNames = {
  coverBlock: {
    position: 'absolute',
    color: 'white',
    top: 10,
    left: '30%',
    transform: 'translateX(-30%)'
  }
};

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
        <Typography component="div" sx={classNames.coverBlock}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Topic topicData={topicData} />
          </Box>
          <Typography component="br" />
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                lg: '1fr 1fr'
              }
            }}
          >
            {postData.results.map((post, idx) => {
              return <PostCard key={`post-${idx}`} post={post} />;
            })}
          </Box>

          <Typography component="br" />
        </Box>
      </Container>
    </>
  );
}
