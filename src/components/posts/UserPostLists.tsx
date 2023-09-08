import { useRouter } from 'next/router';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts } from '@/api/postApi';
import { IPost } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';
import { margeList } from '@/utils';

import CommonErrorPage from '../utils/CommonErrorPage';
import Loading from '../utils/Loading';
import PostCard from './PostCard';

function PostLists({ username = '' }: { username: string }) {
  const postLimit = 20;
  const router = useRouter();

  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [postAfter, setPostAfter] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<IPost[]>([]);

  const fetchPostData = (after: string | null = null) => {
    setIsLoading(true);
    const params: ObjectType = { username, limit: postLimit, after };
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

  React.useEffect(() => {
    fetchPostData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, username]);

  if (errorMessage) return <CommonErrorPage message={errorMessage} />;
  if (!posts) return <Loading />;

  return (
    <>
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
        {posts.map((post, idx) => {
          return <PostCard key={`post-${idx}`} post={post} />;
        })}
      </Box>
      {postAfter ? (
        <Typography component="div">
          <Grid container justifyContent="center">
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => fetchPostData(postAfter)}
            >
              Load More
            </LoadingButton>
          </Grid>
        </Typography>
      ) : null}
    </>
  );
}

export default PostLists;
