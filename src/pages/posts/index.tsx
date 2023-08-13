import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts, fetchTopics } from '@/api/postApi';
import PostCard from '@/components/posts/PostCard';
import Topic from '@/components/posts/Topic';
import { IPostList, ITopicList } from '@/types/api.types';
import { getListApiDefaultValue } from '@/utils';

export async function getServerSideProps(SSContext: GetServerSidePropsContext) {
  const { topic } = SSContext.query;

  let postData: IPostList = getListApiDefaultValue();
  try {
    postData = await fetchPosts({ SSContext, params: { page: 1, limit: 50, topics: topic } });
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e, SSContext);
    postData.errorMessage = errorMessage;
  }

  let topicData: ITopicList = getListApiDefaultValue();
  try {
    topicData = await fetchTopics({ params: { page: 1, limit: 20 } });
  } catch (e: any) {
    const { message: errorMessage } = handleAxiosError(e);
    topicData.errorMessage = errorMessage;
  }

  // Pass the fetched data as props
  return {
    props: {
      postData,
      topicData
    }
  };
}

interface PostsProps {
  postData: IPostList;
  topicData: ITopicList;
}

export default function Posts({ postData, topicData }: PostsProps) {
  return (
    <>
      <Head>
        <title>Blog Post List</title>
        <meta name="description" content="List of blog page" />
      </Head>
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
                xs: '1fr'
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
