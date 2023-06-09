import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '@/context/ColorModeContext';

export default function UnAuthMenu() {
  const router = useRouter();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLoginRoute = () => {
    router.push(`/auth/sign-in?next=${router.pathname}`);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={colorMode.toggleColorMode}>
        <IconButton sx={{ ml: 1 }} color="inherit" aria-label="change color mode">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>{theme.palette.mode === 'dark' ? 'Dark' : 'Light'} Mode</p>
      </MenuItem>
      <MenuItem>
        <Link href={'/about'}>
          <IconButton size="large" aria-label="about icon" aria-haspopup="true" color="inherit">
            <InfoIcon />
          </IconButton>
          About
        </Link>
      </MenuItem>

      <MenuItem onClick={handleLoginRoute}>
        <IconButton size="large" aria-label="login button" aria-haspopup="true" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button color="inherit">
          <Link href={'/about'}>About</Link>
        </Button>
        <Button color="inherit" onClick={handleLoginRoute}>
          Login
        </Button>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          aria-label="change color mode"
        >
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="small"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </>
  );
}
