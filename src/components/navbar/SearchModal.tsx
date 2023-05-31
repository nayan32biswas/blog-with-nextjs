import { Fragment, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

const styles = {
  textInput: {
    fontSize: 'large'
  },
  searchButton: {
    borderRadius: '10px',
    backgroundColor: 'rgb(243 245 245)'
  }
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    caretColor: 'transparent',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2)
  }
}));

const SearchModal = () => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const numbers = [0, 1, 2, 3, 4, 5, 6];

  return (
    <>
      <Search onClick={handleModalOpen} sx={{ input: { cursor: 'pointer' } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <BootstrapDialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <TextField
          type="search"
          id="search"
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            style: styles.textInput
          }}
        />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {numbers.map((val: number, idx: number) => {
            return (
              <Fragment key={idx}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Profile Avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Post Title"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque fuga
                          tenetur odio aspernatur mollitia, vitae voluptatibus maiores.
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {idx + 1 !== numbers.length ? <Divider variant="inset" component="li" /> : null}
              </Fragment>
            );
          })}
        </List>
      </BootstrapDialog>
    </>
  );
};

export default SearchModal;
