import React from 'react';

import Typography from '@mui/material/Typography';

import { IPost } from '@/types/api.types';

interface PostCardProps {
  post?: IPost;
  val?: number;
}

function PostCard({ val }: PostCardProps) {
  return (
    <Typography component="div">
      <Typography component="h1" variant="h5">
        {val}: Posts
      </Typography>
      <Typography component="br" />
    </Typography>
  );
}

export default PostCard;
