import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { isAuthenticated } from '@/api/apiUtils/auth';
import { UserContext } from '@/context/UserContext';

const ProfileMenu = dynamic(() => import('./ProfileMenu'));
const SearchBox = dynamic(() => import('./SearchBox'));
const UnAuthMenu = dynamic(() => import('./UnAuthMenu'));

function Navbar() {
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    if (isAuthenticated()) {
      userDispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: true
        }
      });
    }
  }, [userState.auth.isAuthenticated, userDispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 1 }}>
            <Link href={'/'}>Blog</Link>
          </Typography>

          <SearchBox />

          <Box sx={{ flexGrow: 1 }} />

          {userState.auth.isAuthenticated === true && userState.me?.username ? (
            <ProfileMenu username={userState.me?.username} />
          ) : (
            <UnAuthMenu />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
