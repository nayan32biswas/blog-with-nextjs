// import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts, fetchTopics } from '@/api/postApi';
import PostCard from '@/components/posts/PostCard';
import Topic from '@/components/posts/Topic';
import { IPost, ITopic } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';
import { margeList } from '@/utils';

// import { getListApiDefaultValue } from '@/utils';

// export async function getServerSideProps(SSContext: GetServerSidePropsContext) {
//   const { topic } = SSContext.query;

//   let postData: IPostList = getListApiDefaultValue();
//   try {
//     postData = await fetchPosts({ SSContext, params: { page: 1, limit: 50, topics: topic } });
//   } catch (e: any) {
//     const { message: errorMessage } = handleAxiosError(e, SSContext);
//     postData.errorMessage = errorMessage;
//   }

//   let topicData: ITopicList = getListApiDefaultValue();
//   try {
//     topicData = await fetchTopics({ params: { page: 1, limit: 20 } });
//   } catch (e: any) {
//     const { message: errorMessage } = handleAxiosError(e);
//     topicData.errorMessage = errorMessage;
//   }

//   // Pass the fetched data as props
//   return {
//     props: {
//       postData,
//       topicData
//     }
//   };
// }

// interface PostsProps {
//   postData: IPostList;
//   topicData: ITopicList;
// }
// export default function Posts({ postData, topicData }: PostsProps) {

export default function Posts() {
  const postLimit = 20;
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [postAfter, setPostAfter] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<IPost[]>([]);
  // const [topicAfter, setTopicAfter] = React.useState<string | null>(null);
  const [topics, setTopics] = React.useState<ITopic[]>([]);

  const fetchPostData = (after: string | null = null) => {
    setIsLoading(true);
    const params: ObjectType = { limit: postLimit, after };
    const topic = router.query?.topic;
    if (topic) {
      params.topics = topic;
    }
    fetchPosts({ params })
      .then((postData) => {
        setIsLoading(false);
        setPostAfter(postData.after);
        if (after === null) {
          setPosts((): IPost[] => [...postData.results]);
        } else {
          setPosts((prevPosts): IPost[] => [...margeList(prevPosts, postData.results, 'slug')]);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        const { message: errorMessage } = handleAxiosError(e);
        setErrorMessage(errorMessage);
      });
  };
  const fetchTopicData = async (after: string | null = null) => {
    try {
      const params = { limit: postLimit, after };
      const topicData = await fetchTopics({ params });
      // setTopicAfter(topicData.after);
      setTopics((prevTopics): ITopic[] => [...prevTopics, ...topicData.results]);
    } catch (e: any) {
      const { message: errorMessage } = handleAxiosError(e);
      setErrorMessage(errorMessage);
    }
  };

  React.useEffect(() => {
    if (router.isReady) {
      fetchPostData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  React.useEffect(() => {
    fetchTopicData(null);
  }, []);

  if (errorMessage) {
    console.log(errorMessage);
  }

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
            <Topic topics={topics} />
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
            {posts.map((post, idx) => {
              return <PostCard key={`post-${idx}`} post={post} />;
            })}
          </Box>

          <Typography component="br" />
        </Box>
        {postAfter && (
          <Typography component="div">
            <Grid container justifyContent="center">
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2, maxWidth: '200px' }}
                onClick={() => fetchPostData(postAfter)}
              >
                Load More
              </LoadingButton>
            </Grid>
          </Typography>
        )}
      </Container>
    </>
  );
}
