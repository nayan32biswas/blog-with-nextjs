import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import Container from '@mui/material/Container';

import PostForm from '@/components/posts/PostForm';

function NewPosts() {
  return (
    <>
      <Head>
        <title>Write your post here</title>
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <PostForm />
      </Container>
    </>
  );
}

// export default NewPosts;
export default dynamic(() => Promise.resolve(NewPosts), { ssr: false });
