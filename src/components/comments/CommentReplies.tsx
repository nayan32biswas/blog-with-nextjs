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
import { createCommentReply, deleteReply, updateReply } from '@/api/postApi';
import { UserContext } from '@/context/UserContext';
import { IComment, IReply } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

import ConfirmDialog from '../posts/ConfirmDialog';
import FullPageLoader from '../utils/FullPageLoader';
import Loading from '../utils/Loading';
import CommentEditModal from './CommentEditModal';
import CommentForm, { IHandleCommentSubmit } from './CommentForm';

interface CommentRepliesProps {
  replies: IReply[];
  reply_box_open?: boolean;
  post_slug: string;
  commentId: string;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function CommentReplies({ replies, post_slug, commentId, setComments }: CommentRepliesProps) {
  const { userState } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [openDeleteReplyId, setOpenDeleteReplyId] = React.useState<string | null>(null);

  const [updateReplyData, setUpdateReplyData] = React.useState<any>(null);

  if (!replies) {
    return <Loading />;
  }

  const addReplies = (commentId: string, reply: IReply) => {
    setComments((prevComment: IComment[]) => {
      for (let i = 0; i < prevComment.length; i++) {
        if (prevComment[i].id === commentId) {
          prevComment[i].replies = [...prevComment[i].replies, reply];
          break;
        }
      }
      return [...prevComment];
    });
  };
  const removeReplies = (commentId: string, replyId: string) => {
    setComments((prevComment: IComment[]) => {
      for (let i = 0; i < prevComment.length; i++) {
        if (prevComment[i].id === commentId) {
          prevComment[i].replies = [
            ...prevComment[i].replies.filter((reply) => reply.id != replyId)
          ];
          break;
        }
      }
      return [...prevComment];
    });
  };
  const updateReplyState = (commentId: string, replyId: string, description: string) => {
    setComments((preComments: IComment[]) => {
      for (let i = 0, assign = false; assign == false && i < preComments.length; i++) {
        if (preComments[i].id != commentId) {
          continue;
        }
        for (let j = 0; assign == false && j < preComments[i].replies.length; j++) {
          if (preComments[i].replies[j].id == replyId) {
            assign = true;
            preComments[i].replies[j].description = description;
          }
        }
      }
      return [...preComments];
    });
  };

  const handleCommentSubmit = (data: IHandleCommentSubmit) => {
    const payload = { description: data.description };

    if (!commentId) throw 'Invalid CommentID';

    createCommentReply({ payload, post_slug, commentId: commentId })
      .then((replyData: IReply) => {
        addReplies(commentId, replyData);
        data.resetForm();
        data.setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        data.setIsLoading(false);
        const { message } = handleAxiosError(error);
        if (error) {
          data.setFormError(message);
        }
      });
  };

  const handleReplyUpdate = (data: IHandleCommentSubmit) => {
    const { replyId, commentId, description } = data;
    if (!commentId) throw 'Invalid comment id';
    if (!replyId) throw 'Invalid reply id';

    const payload = { description };
    updateReply({ post_slug, commentId, replyId, payload })
      .then(() => {
        updateReplyState(commentId, replyId, description);
        data.resetForm();
        data.setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        data.setIsLoading(false);
        const { message } = handleAxiosError(error);
        if (error) {
          data.setFormError(message);
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
        <CommentForm
          handleSubmit={handleCommentSubmit}
          commentId={commentId}
          buttonName={'Reply'}
        />

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
                      <Button
                        onClick={() => {
                          setUpdateReplyData({
                            commentId: commentId,
                            replyId: reply.id,
                            description: reply.description
                          });
                        }}
                      >
                        Edit
                      </Button>

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
      {updateReplyData && (
        <CommentEditModal
          title="Do you want to delete this comment?"
          open={updateReplyData != null}
          setOpen={() => setUpdateReplyData(null)}
          commentId={updateReplyData.commentId}
          replyId={updateReplyData.replyId}
          description={updateReplyData.description}
          onConfirm={handleReplyUpdate}
        />
      )}
    </React.Fragment>
  );
}

export default CommentReplies;
