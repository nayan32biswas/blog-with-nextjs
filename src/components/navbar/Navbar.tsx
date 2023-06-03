import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { isAuthenticated } from '@/api/apiUtils/auth';
import { UserContext } from '@/context/UserContext';

import ProfileMenu from './ProfileMenu';
import SearchModal from './SearchModal';

export default function Navbar() {
  const router = useRouter();
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

  const handleLoginRoute = () => {
    router.push(`/auth/sign-in?next=${router.pathname}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 1 }}>
            <Link href={'/'}>Blog</Link>
          </Typography>

          <SearchModal />

          <Box sx={{ flexGrow: 1 }} />

          {userState.auth.isAuthenticated === true ? (
            <ProfileMenu />
          ) : (
            <Button color="inherit" onClick={handleLoginRoute}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
