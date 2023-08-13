import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Container from '@mui/material/Container';

import { AxiosError } from 'axios';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { createPost } from '@/api/postApi';
import PostForm from '@/components/posts/PostForm';
import { IPost } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';

function NewPosts() {
  const router = useRouter();

  const handleSubmitPost = (payload: ObjectType, setIsLoading: any, setFormError: any) => {
    console.log(payload);
    createPost({ payload })
      .then((postData: IPost) => {
        setIsLoading(false);
        router.push(`/posts/${postData.slug}`);
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        const { message } = handleAxiosError(error);
        if (error) {
          setFormError(message);
        }
      });
  };
  return (
    <>
      <Head>
        <title>Write your post here</title>
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <PostForm handleSubmitPost={handleSubmitPost} />
      </Container>
    </>
  );
}

// export default NewPosts;
export default dynamic(() => Promise.resolve(NewPosts), { ssr: false });
