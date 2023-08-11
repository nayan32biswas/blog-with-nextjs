import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { uploadImage } from '@/api/utilsApi';

function NewPosts() {
  const [coverImage, setCoverImage] = React.useState<string | null>(null);

  function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage({ image: file }).then((imagePath: string) => {
        console.log(imagePath);
        setCoverImage(imagePath);
      });
    }
  }

  return (
    <>
      <Head>
        <title>Write your post here</title>
        <meta name="description" content="List of blog page" />
      </Head>
      <Container maxWidth="lg">
        <Typography component={'div'}>
          <input type="file" accept="image/*" onChange={handleUploadImage} />
          {coverImage && (
            <Typography component={'div'}>
              <Image
                src={`${process.env.CONTENT_URL}${coverImage}`}
                width={50}
                height={50}
                alt="Selected Image"
              />
            </Typography>
          )}
        </Typography>
      </Container>
    </>
  );
}

export default NewPosts;
