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

import { IReply } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

interface CommentRepliesProps {
  replies: IReply[];
  reply_box_open?: boolean;
}

function CommentReplies({ replies, reply_box_open }: CommentRepliesProps) {
  if (!replies) {
    return (
      <Typography component="h1" variant="h4">
        Loading...
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {reply_box_open === true ? <TextField /> : null}
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
