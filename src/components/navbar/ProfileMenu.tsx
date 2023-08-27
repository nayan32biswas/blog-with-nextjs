import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

import { clearToken } from '@/api/apiUtils/auth';
import { ColorModeContext } from '@/context/ColorModeContext';

const MyAccountItem = () => {
  return (
    <MenuItem>
      <Link href={'/me'}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        My Account
      </Link>
    </MenuItem>
  );
};
const ProfileItem = ({ username }: { username: string }) => {
  return (
    <MenuItem>
      <Link href={`/@${username}`}>
        <IconButton
          size="large"
          aria-label="User Profile"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        Profile
      </Link>
    </MenuItem>
  );
};
const LogOutItem = () => {
  const router = useRouter();

  const handleLogout = () => {
    clearToken();

    router.refresh();
    // router.push('/');
    // router.push('/').then(() => router.reload());
  };
  return (
    <MenuItem onClick={handleLogout}>
      <IconButton size="large" aria-label="logout button" aria-haspopup="true" color="inherit">
        <LogoutIcon />
      </IconButton>
      <p>Logout</p>
    </MenuItem>
  );
};

export default function ProfileMenu({ username }: { username: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={colorMode.toggleColorMode}>
        <IconButton sx={{ ml: 1 }} color="inherit" aria-label="change color mode">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>{theme.palette.mode === 'dark' ? 'Dark' : 'Light'} Mode</p>
      </MenuItem>
      <MyAccountItem />
      <ProfileItem username={username} />
      <LogOutItem />
    </Menu>
  );

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
      <MyAccountItem />
      <ProfileItem username={username} />

      <MenuItem>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem>
        <Link href={'/new-post'}>
          <IconButton size="large" aria-label="about icon" aria-haspopup="true" color="inherit">
            <InfoIcon />
          </IconButton>
          Write
        </Link>
      </MenuItem>

      <MenuItem>
        <Link href={'/about'}>
          <IconButton size="large" aria-label="about icon" aria-haspopup="true" color="inherit">
            <InfoIcon />
          </IconButton>
          About
        </Link>
      </MenuItem>

      <LogOutItem />
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button color="inherit">
          <Link href={'/new-post'}>Write</Link>
        </Button>
        <Button color="inherit">
          <Link href={'/about'}>About</Link>
        </Button>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="show menu"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
