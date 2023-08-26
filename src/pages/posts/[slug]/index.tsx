import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { deletePost, fetchPostsDetails } from '@/api/postApi';
import PostComments from '@/components/comments/PostComments';
import PostDeleteDialog from '@/components/posts/PostDeleteDioalog';
import Common404 from '@/components/utils/Common404';
import CommonErrorPage from '@/components/utils/CommonErrorPage';
import FullPageLoader from '@/components/utils/FullPageLoader';
import { UserContext } from '@/context/UserContext';
import { IPostDetails } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

export async function getServerSideProps(SSContext: GetServerSidePropsContext) {
  const { slug } = SSContext.query;

  let errorMessage = '';
  let postDetails: IPostDetails | null = null;
  try {
    if (typeof slug === 'string') {
      postDetails = await fetchPostsDetails({ SSContext, post_slug: slug });
    } else {
      errorMessage = 'Invalid Route';
    }
  } catch (e: any) {
    const { message } = handleAxiosError(e, SSContext);
    errorMessage = message;
  }

  // Pass the fetched data as props
  return {
    props: {
      postDetails,
      errorMessage
    }
  };
}

interface Props {
  postDetails: IPostDetails | null;
  errorMessage?: string;
}

function PostDetails({ postDetails, errorMessage }: Props) {
  const router = useRouter();
  const { userState } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  if (errorMessage) {
    return <CommonErrorPage message={errorMessage} />;
  }
  if (!postDetails) {
    return <Common404 message="Post not found" />;
  }

  const handlePostDelete = async (isDelete: boolean) => {
    if (!userState.me) {
      alert('Invalid request');
      return;
    }
    if (isDelete) {
      setLoading(true);
      deletePost({ post_slug: postDetails.slug })
        .then(() => {
          router.push(`/@${userState.me?.username}`);
        })
        .catch(() => {
          console.log('something wrong');
          setLoading(false);
          setDeleteOpen(false);
        });
    } else {
      setDeleteOpen(false);
    }
  };

  const userUrl = `/@${postDetails.author.username}`;
  return (
    <>
      <Head>
        <title>{postDetails.title}</title>
        <meta name="description" content="Post Details" />
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <FullPageLoader loading={loading} />
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" fontWeight={400}>
              {postDetails.title}
            </Typography>
            <Typography component={'hr'} />
            <Box display="flex" justifyContent="space-between">
              <CardHeader
                avatar={
                  <Link href={userUrl}>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {postDetails.author.image ? (
                        <Image
                          height={30}
                          width={30}
                          src={getFileUrl(postDetails.author.image)}
                          alt="Author Avatar"
                        />
                      ) : (
                        postDetails.author.full_name[0]
                      )}
                    </Avatar>
                  </Link>
                }
                title={<Link href={userUrl}>{postDetails.author.full_name}</Link>}
                subheader={
                  <Typography>
                    <Typography component={'span'} sx={{ color: 'gray' }}>
                      Published At:
                    </Typography>{' '}
                    <Typography component={'span'}>
                      {toLocaleDateString(postDetails.publish_at)}
                    </Typography>
                  </Typography>
                }
              />
              {userState.me?.username == postDetails.author.username && (
                <Typography component="div" display="flex" alignItems="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Button>
                      <Link href={`/posts/${postDetails.slug}/edit`}>Edit</Link>
                    </Button>

                    <Button onClick={() => setDeleteOpen(true)} color="warning">
                      Delete
                    </Button>
                    <PostDeleteDialog open={deleteOpen} handleDelete={handlePostDelete} />
                  </Box>
                </Typography>
              )}
            </Box>
          </Container>
          <CardMedia
            sx={{
              Media: {
                height: '100%',
                width: '100%'
              }
            }}
            component="img"
            image={getFileUrl(postDetails.cover_image) || ''}
            alt="Post Cover Image"
          />
          <Typography component={'br'} />
          <Typography component={'hr'} />
          <Container maxWidth="md">
            <Typography component="p">{postDetails.description}</Typography>
          </Container>
        </Box>

        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography component={'hr'} />
          <Typography component={'h1'} variant="h3">
            Comments
          </Typography>
          <Typography component={'hr'} />
          <Typography component={'br'} />
          <PostComments post_slug={postDetails.slug} />
        </Box>
      </Container>
    </>
  );
}

export default PostDetails;
