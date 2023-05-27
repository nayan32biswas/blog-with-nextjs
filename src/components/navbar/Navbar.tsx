import Link from 'next/link';

import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ProfileMenu from './ProfileMenu';
import MySearchInput from './SearchModal';

export interface NavbarProps {
  isAuthenticated: boolean;
  // children?: React.ReactNode;
  // onClose: () => void;
}
export default function Navbar({ isAuthenticated }: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ m: 1 }}>
            <Link href={'/'}>Blog</Link>
          </Typography>

          <MySearchInput />

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated === true ? (
            <ProfileMenu />
          ) : (
            <Button color="inherit">
              <Link href={'/auth/login'}>Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
