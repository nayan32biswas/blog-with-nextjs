import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { AxiosError } from 'axios';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { createCommentReply, deleteReply } from '@/api/postApi';
import { UserContext } from '@/context/UserContext';
import { IReply } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

import ConfirmDialog from '../posts/ConfirmDialog';
import FullPageLoader from '../utils/FullPageLoader';
import Loading from '../utils/Loading';
import CommentForm from './CommentForm';

interface CommentRepliesProps {
  replies: IReply[];
  reply_box_open?: boolean;
  post_slug: string;
  commentId: string;
  // eslint-disable-next-line no-unused-vars
  addReplies: (commentId: string, reply: IReply) => void;
  // eslint-disable-next-line no-unused-vars
  removeReplies: (commentId: string, replyId: string) => void;
}

function CommentReplies({
  replies,
  post_slug,
  commentId,
  addReplies,
  removeReplies,
  reply_box_open
}: CommentRepliesProps) {
  const { userState } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [openDeleteReplyId, setOpenDeleteReplyId] = React.useState<string | null>(null);

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

    if (!commentId) throw 'Invalid CommentID';

    createCommentReply({ payload, post_slug, commentId: commentId })
      .then((replyData: IReply) => {
        addReplies(commentId, replyData);
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

  const handleCommentDelete = async (replyId: string) => {
    setLoading(true);

    deleteReply({ post_slug, commentId, replyId })
      .then(() => {
        removeReplies(commentId, replyId);
        setLoading(false);
        setOpenDeleteReplyId(null);
      })
      .catch(() => {
        setLoading(false);
        setOpenDeleteReplyId(null);
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
        <FullPageLoader loading={loading} />
        {replies.map((reply: IReply, idx: number) => {
          return (
            <Container key={`reply-${reply.id}`} maxWidth="sm">
              {idx !== 0 ? <Typography component={'hr'} /> : null}
              <Box display="flex" justifyContent="space-between">
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

                {userState.me?.username == reply.user?.username && (
                  <Typography component="div" display="flex" alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Button>Edit</Button>

                      <Button onClick={() => setOpenDeleteReplyId(reply.id)} color="warning">
                        Delete
                      </Button>
                      {reply.id == openDeleteReplyId && (
                        <ConfirmDialog
                          title="Do you want to delete this reply?"
                          open={openDeleteReplyId != null}
                          setOpen={() => setOpenDeleteReplyId(null)}
                          onConfirm={() => handleCommentDelete(reply.id)}
                        >
                          This is not reversible action?
                        </ConfirmDialog>
                      )}
                    </Box>
                  </Typography>
                )}
              </Box>
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
