import Link from 'next/link';
import React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { ITopic } from '@/types/api.types';

const classNames = {
  root: {
    display: 'block',
    justifyContent: 'left',
    flexWrap: 'nowrap',
    listStyle: 'none',
    padding: '4px',
    margin: 0,
    overflow: 'auto'
  },
  tab: { opacity: 1, minWidth: '0px', padding: 0 },
  chip: {
    margin: '4px',
    cursor: 'pointer'
  }
};

function Topic({ topics }: { topics: ITopic[] }) {
  return (
    <Box sx={classNames.root}>
      <Tabs
        variant="scrollable"
        value={false}
        allowScrollButtonsMobile
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {topics.map((topic, idx) => {
          return (
            <Tab
              key={idx}
              sx={classNames.tab}
              label={
                <Link href={{ pathname: '/posts', query: { topic: topic.slug } }}>
                  <Chip label={topic.name} sx={classNames.chip} />
                </Link>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default Topic;
