import Link from 'next/link';
import React from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';

const getStyles = (theme: Theme) => {
  const mode = theme.palette.mode;
  return {
    menuBorder: {
      position: 'relative',
      outline: '0px',
      margin: 'auto',
      marginTop: '5px',
      display: 'flex',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: mode == 'light' ? 'rgb(240, 240, 240)' : 'rgb(25, 25, 30)'
    },
    tabButton: {}
  };
};

export const config = {
  matcher: ['/me']
};

function Me() {
  const theme = useTheme<Theme>();
  const styles = getStyles(theme);

  const tabKeys = {
    personalInfo: 'personal-info',
    security: 'security'
  };

  return (
    <Typography component="div">
      <Typography component="div" sx={styles.menuBorder}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            whiteSpace: '20px'
          }}
        >
          <Link href={`/me#${tabKeys.personalInfo}`}>
            <Button>Personal Info</Button>
          </Link>
          <Link href={`/me#${tabKeys.security}`}>
            <Button>Security</Button>
          </Link>
        </Box>
      </Typography>
    </Typography>
  );
}

export default Me;
