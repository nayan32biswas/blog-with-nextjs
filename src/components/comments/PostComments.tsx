import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchComments } from '@/api/postApi';
import { IComment, ICommentList, IReply } from '@/types/api.types';
import { getListApiDefaultValue, toLocaleDateString } from '@/utils';

interface PostCommentsProps {
  post_slug: string;
}

function PostComments({ post_slug }: PostCommentsProps) {
  const limit = 20;

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [commentData, setCommentData] = React.useState<ICommentList | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      let commentData: ICommentList = getListApiDefaultValue();
      try {
        commentData = await fetchComments({
          post_slug,
          params: { page: currentPage, limit: limit }
        });
      } catch (e: any) {
        const { message: errorMessage } = handleAxiosError(e);
        commentData.errorMessage = errorMessage;
      }
      setCommentData(commentData);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e);
    });
  }, [post_slug, currentPage]);

  if (!commentData) {
    return (
      <Typography component="h1" variant="h4">
        Loading...
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <TextField />
      {commentData.results.map((comment: IComment) => {
        return (
          <Container key={comment.id} maxWidth="sm">
            <Typography component={'hr'} />
            <CardHeader
              avatar={
                <Link href={`/@${comment?.user?.username}`}>
                  {comment.user ? (
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {comment.user.image ? (
                        <Image
                          height={30}
                          width={30}
                          src={comment.user.image}
                          alt="Author Avatar"
                        />
                      ) : (
                        comment.user.full_name[0]
                      )}
                    </Avatar>
                  ) : null}
                </Link>
              }
              title={<Link href={`/@${comment?.user?.username}`}>{comment?.user?.full_name}</Link>}
              subheader={
                <Typography>
                  <Typography component={'span'} sx={{ color: 'gray' }}>
                    Published At:
                  </Typography>{' '}
                  <Typography component={'span'}>
                    {toLocaleDateString(comment.created_at)}
                  </Typography>
                </Typography>
              }
            />
            <Container maxWidth="md">
              <Typography component="p">{comment.description}</Typography>
            </Container>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {comment.replies.map((reply: IReply) => {
                return (
                  <Container key={`reply-${reply.id}`} maxWidth="sm">
                    <Typography component={'hr'} />
                    <CardHeader
                      avatar={
                        <Link href={`/@${reply?.user?.username}`}>
                          {reply.user ? (
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                              {reply.user.image ? (
                                <Image
                                  height={30}
                                  width={30}
                                  src={reply.user.image}
                                  alt="Author Avatar"
                                />
                              ) : (
                                reply.user.full_name[0]
                              )}
                            </Avatar>
                          ) : null}
                        </Link>
                      }
                      title={
                        <Link href={`/@${reply?.user?.username}`}>{reply?.user?.full_name}</Link>
                      }
                      subheader={
                        <Typography>
                          <Typography component={'span'} sx={{ color: 'gray' }}>
                            Published At:
                          </Typography>{' '}
                          <Typography component={'span'}>
                            {toLocaleDateString(reply.created_at)}
                          </Typography>
                        </Typography>
                      }
                    />
                    <Container maxWidth="md">
                      <Typography component="p">{reply.description}</Typography>
                    </Container>
                  </Container>
                );
              })}
            </Box>
          </Container>
        );
      })}
    </React.Fragment>
  );
}

export default PostComments;
