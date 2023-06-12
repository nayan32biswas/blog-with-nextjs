import Image from 'next/image';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { IPost } from '@/types/api.types';
import { toLocaleDateString } from '@/utils';

function PostCard({ post }: { post: IPost }) {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {post.author.image ? (
                  <Image height={30} width={30} src={post.author.image} alt="Author Avatar" />
                ) : (
                  post.author.full_name[0]
                )}
              </Avatar>
            }
            title={post.author.full_name}
            subheader={toLocaleDateString(post.publish_at)}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.short_description}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="194"
            image={post.cover_image || ''}
            alt="Post Cover Image"
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default PostCard;
