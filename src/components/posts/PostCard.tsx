import Link from 'next/link';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { IPost } from '@/types/api.types';
import { getFileUrl, toLocaleDateString } from '@/utils';

function PostCard({ post }: { post: IPost; isOwner?: boolean }) {
  const theme = useTheme();
  const userUrl = `/@${post.author.username}`;
  const postDetailsUrl = `/posts/${post.slug}`;
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardHeader
            avatar={
              <Link href={userUrl}>
                <Avatar
                  sx={{
                    bgcolor: red[500],
                    width: theme.spacing(7),
                    height: theme.spacing(7)
                  }}
                  src={getFileUrl(post.author.image)}
                >
                  {post.author.full_name[0]}
                </Avatar>
              </Link>
            }
            title={<Link href={userUrl}>{post.author.full_name}</Link>}
            subheader={
              post.publish_at ? (
                <span>{toLocaleDateString(post.publish_at)}</span>
              ) : (
                <Typography component={'span'} color={red[300]}>
                  Not published
                </Typography>
              )
            }
          />
          <CardContent>
            <Link href={postDetailsUrl}>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.short_description}
              </Typography>
            </Link>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <Link href={postDetailsUrl}>
            <CardMedia
              component="img"
              width="200px"
              image={getFileUrl(post.cover_image) || ''}
              alt="Post Cover Image"
            />
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PostCard;
