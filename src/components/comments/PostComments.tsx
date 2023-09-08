import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { AxiosError } from 'axios';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { createComment, deleteComment, fetchComments, updateComment } from '@/api/postApi';
import { UserContext } from '@/context/UserContext';
import { IComment, ICommentList } from '@/types/api.types';
import { getFileUrl, getListApiDefaultValue, toLocaleDateString } from '@/utils';

import ConfirmDialog from '../posts/ConfirmDialog';
import FullPageLoader from '../utils/FullPageLoader';
import Loading from '../utils/Loading';
import CommentEditModal from './CommentEditModal';
import CommentForm, { IHandleCommentSubmit } from './CommentForm';
import CommentReplies from './CommentReplies';

interface PostCommentsProps {
  post_slug: string;
}

function PostComments({ post_slug }: PostCommentsProps) {
  const limit = 5;
  const { userState } = React.useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [comments, setComments] = React.useState<IComment[]>([]);
  const [commentAfter, setCommentAfter] = React.useState<string | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [openDeleteCommentId, setOpenDeleteCommentId] = React.useState<string | null>(null);

  const [updateCommentData, setUpdateCommentData] = React.useState<any>(null);

  function margeComments(newComments: IComment[]) {
    const commentIds: Set<string> = new Set();
    const commentList = [...comments];
    commentList.forEach((comment: IComment) => {
      commentIds.add(comment.id);
    });

    newComments.forEach((comment: IComment) => {
      if (commentIds.has(comment.id) === false) {
        commentList.push(comment);
      }
    });
    setComments(commentList);
  }

  const fetchCommentData = (after: string | null = null) => {
    let commentData: ICommentList = getListApiDefaultValue();
    setIsLoading(true);
    fetchComments({
      post_slug,
      params: { after, limit }
    })
      .then((commentData) => {
        setCommentAfter(commentData.after);
        margeComments(commentData.results);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        const { message: errorMessage } = handleAxiosError(e);
        commentData.errorMessage = errorMessage;
      });
  };

  React.useEffect(() => {
    fetchCommentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentSubmit = (data: IHandleCommentSubmit) => {
    const payload = { description: data.description };
    createComment({ payload, post_slug })
      .then((commentData: IComment) => {
        setComments((prevState: IComment[]) => [commentData, ...prevState]);
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

  const handleCommentUpdate = (data: IHandleCommentSubmit) => {
    const payload = { description: data.description };
    if (!data.commentId) throw 'Invalid comment id';

    updateComment({ payload, post_slug, commentId: data.commentId })
      .then(() => {
        setComments((prevState: IComment[]) => [
          ...prevState.map((comment: IComment) => {
            if (comment.id == data.commentId) {
              comment.description = data.description;
            }
            return comment;
          })
        ]);
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

  if (!comments) {
    return <Loading />;
  }

  const handleCommentDelete = async (commentId: string) => {
    setLoading(true);
    deleteComment({ post_slug, commentId })
      .then(() => {
        setComments((prevComments: IComment[]) => [
          ...prevComments.filter((comment: IComment) => comment.id != commentId)
        ]);
        setLoading(false);
        setOpenDeleteCommentId(null);
      })
      .catch(() => {
        setLoading(false);
        setOpenDeleteCommentId(null);
      });
  };

  return (
    <React.Fragment>
      <FullPageLoader loading={loading} />
      <CommentForm handleSubmit={handleCommentSubmit} buttonName={'Comment'} />
      {comments.map((comment: IComment, idx: number) => {
        return (
          <Container key={`comment-${comment.id}`} maxWidth="sm">
            {idx !== 0 ? <Typography component={'hr'} /> : null}
            <Box display="flex" justifyContent="space-between">
              <CardHeader
                avatar={
                  <Link href={`/@${comment?.user?.username}`}>
                    {comment.user ? (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {comment.user.image ? (
                          <Image
                            height={30}
                            width={30}
                            src={getFileUrl(comment.user.image)}
                            alt="Author Avatar"
                          />
                        ) : (
                          comment.user.full_name[0]
                        )}
                      </Avatar>
                    ) : null}
                  </Link>
                }
                title={
                  <Link href={`/@${comment?.user?.username}`}>{comment?.user?.full_name}</Link>
                }
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

              {userState.me?.username == comment.user?.username && (
                <Typography component="div" display="flex" alignItems="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Button
                      onClick={() => {
                        setUpdateCommentData({
                          commentId: comment.id,
                          description: comment.description
                        });
                      }}
                    >
                      Edit
                    </Button>

                    <Button onClick={() => setOpenDeleteCommentId(comment.id)} color="warning">
                      Delete
                    </Button>
                    {comment.id == openDeleteCommentId && (
                      <ConfirmDialog
                        title="Do you want to delete this comment?"
                        open={openDeleteCommentId != null}
                        setOpen={() => setOpenDeleteCommentId(null)}
                        onConfirm={() => handleCommentDelete(comment.id)}
                      >
                        This is not reversible action?
                      </ConfirmDialog>
                    )}
                  </Box>
                </Typography>
              )}
            </Box>
            <Container maxWidth="md">
              <Typography component="div">
                <Typography component="p">{comment.description}</Typography>
              </Typography>
            </Container>
            <CommentReplies
              setComments={setComments}
              replies={comment.replies}
              post_slug={post_slug}
              commentId={comment.id}
            />
          </Container>
        );
      })}

      {commentAfter && (
        <Typography component="div">
          <Grid container justifyContent="center">
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2, maxWidth: '200px' }}
              onClick={() => fetchCommentData(commentAfter)}
            >
              Load More
            </LoadingButton>
          </Grid>
        </Typography>
      )}
      {updateCommentData && (
        <CommentEditModal
          title="Do you want to delete this comment?"
          open={updateCommentData != null}
          setOpen={() => setUpdateCommentData(null)}
          commentId={updateCommentData.commentId}
          description={updateCommentData.description}
          onConfirm={handleCommentUpdate}
        />
      )}
    </React.Fragment>
  );
}

export default PostComments;
