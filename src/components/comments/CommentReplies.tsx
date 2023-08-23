import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { AxiosError } from 'axios';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { createCommentReply } from '@/api/postApi';
import { IReply } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

import Loading from '../utils/Loading';
import CommentForm from './CommentForm';

interface CommentRepliesProps {
  replies: IReply[];
  reply_box_open?: boolean;
  post_slug: string;
  commentId: string;
  // eslint-disable-next-line no-unused-vars
  setReplies: (commentId: string, reply: IReply) => void;
}

function CommentReplies({
  replies,
  post_slug,
  commentId,
  setReplies,
  reply_box_open
}: CommentRepliesProps) {
  if (!replies) {
    return <Loading />;
  }

  const handleCommentSubmit = (
    description: string,
    setIsLoading: any,
    setFormError: any,
    resetForm: any,
    commentId?: string
  ) => {
    const payload = { description };
    console.log({ payload }, { commentId });
    if (!commentId) throw 'Invalid CommentID';

    createCommentReply({ payload, post_slug, commentId: commentId })
      .then((replyData: IReply) => {
        console.log('Reply created', { replyData });
        setReplies(commentId, replyData);
        resetForm();
        setIsLoading(false);
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
    <React.Fragment>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {reply_box_open === true ? (
          <CommentForm
            handleSubmit={handleCommentSubmit}
            commentId={commentId}
            buttonName={'Reply'}
          />
        ) : null}
        {replies.map((reply: IReply, idx: number) => {
          return (
            <Container key={`reply-${reply.id}`} maxWidth="sm">
              {idx !== 0 ? <Typography component={'hr'} /> : null}
              <CardHeader
                avatar={
                  <Link href={`/@${reply?.user?.username}`}>
                    {reply.user ? (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {reply.user.image ? (
                          <Image
                            height={30}
                            width={30}
                            src={getFileUrl(reply.user.image)}
                            alt="Author Avatar"
                          />
                        ) : (
                          reply.user.full_name[0]
                        )}
                      </Avatar>
                    ) : null}
                  </Link>
                }
                title={<Link href={`/@${reply?.user?.username}`}>{reply?.user?.full_name}</Link>}
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
    </React.Fragment>
  );
}

export default CommentReplies;
