import Link from 'next/link';
import { useContext, useEffect } from 'react';

import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { isAuthenticated } from '@/api/apiUtils/auth';
import { UserContext } from '@/context/UserContext';

import ProfileMenu from './ProfileMenu';
import MySearchInput from './SearchModal';

export default function Navbar() {
  const { userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 1 }}>
            <Link href={'/'}>Blog</Link>
          </Typography>

          <MySearchInput />

          <Box sx={{ flexGrow: 1 }} />

          {userState.auth.isAuthenticated === true ? (
            <ProfileMenu />
          ) : (
            <Button color="inherit">
              <Link href={'/auth/sign-in'}>Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
