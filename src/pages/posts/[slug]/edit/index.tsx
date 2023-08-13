import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Container from '@mui/material/Container';

import { AxiosError } from 'axios';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchPostsDetails, updatePost } from '@/api/postApi';
import PostForm from '@/components/posts/PostForm';
import CommonErrorPage from '@/components/utils/CommonErrorPage';
import Loading from '@/components/utils/Loading';
import { UserContext } from '@/context/UserContext';
import { IPostDetails } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';

function EditPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { userState } = React.useContext(UserContext);

  const [pageInfo, setPageInfo] = React.useState<ObjectType>({});
  const [postData, setPostData] = React.useState<IPostDetails | null>(null);

  React.useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      return;
    }

    const fetchData = async (post_slug: string) => {
      try {
        const data = await fetchPostsDetails({ post_slug });
        setPostData(data);
      } catch (e: any) {
        const { message: errorMessage } = handleAxiosError(e);
        setPageInfo({ ...pageInfo, errorMessage });
      }
    };
    fetchData(slug).catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e);
    });
  }, [slug, pageInfo]);

  const handleCreatePost = (payload: ObjectType, setIsLoading: any, setFormError: any) => {
    updatePost({ payload, post_slug: slug })
      .then(() => {
        setIsLoading(false);
        router.push(`/posts/${slug}`);
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        const { message } = handleAxiosError(error);
        if (error) {
          setFormError(message);
        }
      });
  };
  if (pageInfo.errorMessage) {
    return <CommonErrorPage message={pageInfo.errorMessage} />;
  }
  if (!postData || !userState.me) {
    return <Loading />;
  }
  if (postData.author.username != userState.me.username) {
    return <CommonErrorPage message="You don't have permission to access the data" />;
  }

  return (
    <>
      <Head>
        <title>Write your post here</title>
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <PostForm postDetails={postData} handleSubmitPost={handleCreatePost} />
      </Container>
    </>
  );
}

// export default EditPost;
export default dynamic(() => Promise.resolve(EditPost), { ssr: false });
