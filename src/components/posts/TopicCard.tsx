import React from 'react';

import Typography from '@mui/material/Typography';

import { ITopic } from '@/types/api.types';

interface TopicCardProps {
  topic?: ITopic;
  val?: number;
}

function TopicCard({ val }: TopicCardProps) {
  return (
    <Typography component="div">
      <Typography component="h1" variant="h5">
        {val}: Topics
      </Typography>
      <Typography component="br" />
    </Typography>
  );
}

export default TopicCard;
