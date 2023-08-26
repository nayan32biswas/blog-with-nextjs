import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
import { createComment, deleteComment, fetchComments } from '@/api/postApi';
import { UserContext } from '@/context/UserContext';
import { IComment, ICommentList, IReply } from '@/types/api.types';
import { getFileUrl, getListApiDefaultValue, toLocaleDateString } from '@/utils';

import ConfirmDialog from '../posts/ConfirmDialog';
import FullPageLoader from '../utils/FullPageLoader';
import Loading from '../utils/Loading';
import CommentForm from './CommentForm';
import CommentReplies from './CommentReplies';

interface PostCommentsProps {
  post_slug: string;
}

function PostComments({ post_slug }: PostCommentsProps) {
  const limit = 5;
  const { userState } = React.useContext(UserContext);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [totalComment, setTotalComment] = React.useState<number>(0);

  const [loading, setLoading] = React.useState(false);
  const [openDeleteCommentId, setOpenDeleteCommentId] = React.useState<string | null>(null);

  React.useEffect(() => {
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

    const fetchData = async (post_slug: string, page: number) => {
      let commentData: ICommentList = getListApiDefaultValue();
      try {
        commentData = await fetchComments({
          post_slug,
          params: { page, limit: limit }
        });
      } catch (e: any) {
        const { message: errorMessage } = handleAxiosError(e);
        commentData.errorMessage = errorMessage;
      }

      setTotalComment(commentData.count);
      margeComments(commentData.results);
    };
    fetchData(post_slug, currentPage).catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_slug, currentPage]);

  const handleCommentSubmit = (
    description: string,
    setIsLoading: any,
    setFormError: any,
    resetForm: any
  ) => {
    const payload = { description };
    createComment({ payload, post_slug })
      .then((commentData: IComment) => {
        setComments((prevState: IComment[]) => [commentData, ...prevState]);
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

  if (!comments) {
    return <Loading />;
  }

  const setReplies = (commentId: string, reply: IReply) => {
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

  const handleCommentDelete = async (commentId: string) => {
    console.log({ commentId });

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
                    <Button>Edit</Button>

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
              setReplies={setReplies}
              replies={comment.replies}
              post_slug={post_slug}
              commentId={comment.id}
              reply_box_open={true}
            />
          </Container>
        );
      })}
      {totalComment > currentPage * limit ? (
        <Typography component="div">
          <Grid container justifyContent="center">
            <Typography component={'button'} onClick={() => setCurrentPage(currentPage + 1)}>
              Load More
            </Typography>
          </Grid>
        </Typography>
      ) : null}
    </React.Fragment>
  );
}

export default PostComments;
