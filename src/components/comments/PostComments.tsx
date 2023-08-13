import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { fetchComments } from '@/api/postApi';
import { IComment, ICommentList } from '@/types/api.types';
import { getFileUrl, getListApiDefaultValue, toLocaleDateString } from '@/utils';

import Loading from '../utils/Loading';
import CommentReplies from './CommentReplies';

interface PostCommentsProps {
  post_slug: string;
}

function PostComments({ post_slug }: PostCommentsProps) {
  const limit = 5;

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [totalComment, setTotalComment] = React.useState<number>(0);

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

  if (!comments) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <TextField />
      {comments.map((comment: IComment, idx: number) => {
        return (
          <Container key={comment.id} maxWidth="sm">
            {idx !== 0 ? <Typography component={'hr'} /> : null}
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
              <Typography component="div">
                <Typography component="p">{comment.description}</Typography>
              </Typography>
            </Container>
            <CommentReplies replies={comment.replies} reply_box_open={false} />
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
