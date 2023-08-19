import { useRouter } from 'next/router';
import React from 'react';

import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPosts } from '@/api/postApi';
import { IPostList } from '@/types/api.types';
import { getListApiDefaultValue } from '@/utils';
import { getPageNumber } from '@/utils/urlParser';

import CommonErrorPage from '../utils/CommonErrorPage';
import Loading from '../utils/Loading';
import PostCard from './PostCard';

function PostLists({ username = '' }: { username: string }) {
  const postLimit = 20;
  const router = useRouter();
  const [postData, setPostData] = React.useState<IPostList>(getListApiDefaultValue());
  React.useEffect(() => {
    const pageNumber = getPageNumber(router);

    const fetchData = async () => {
      try {
        const params = { username, limit: postLimit, page: pageNumber };
        const postData = await fetchPosts({ params });
        setPostData((): IPostList => postData);
      } catch (e: any) {
        const { message: errorMessage } = handleAxiosError(e);
        setPostData((prevState: IPostList): IPostList => ({ ...prevState, errorMessage }));
      }
    };
    fetchData();
  }, [router, username]);
  function totalPage() {
    if (postData) {
      return Math.ceil(postData.count / postLimit);
    }
    return 0;
  }
  if (postData.errorMessage) return <CommonErrorPage message={postData.errorMessage} />;
  if (!postData.results) return <Loading />;
  return (
    <>
      {postData.results.map((post, idx) => {
        return <PostCard key={`user-post-${idx}`} post={post} />;
      })}
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Pagination
          count={totalPage()}
          defaultPage={getPageNumber(router)}
          color="primary"
          onChange={(e, value: number) => {
            router.replace({
              query: { ...router.query, page: value }
            });
          }}
        />
      </Box>
    </>
  );
}

export default PostLists;
