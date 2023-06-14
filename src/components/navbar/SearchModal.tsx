import React from 'react';

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

import debounce from 'lodash/debounce';

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
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.25)
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

const SearchModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const numbers = [0, 1, 2, 3, 4, 5, 6];

  const [query, setQuery] = React.useState('');
  React.useEffect(() => {
    console.log('useEffect call database', query);
  }, [query]);
  const onChange = (e: any) => {
    // send data from input field to the backend here
    // will be triggered 500 ms after the user stopped typing
    console.log('onChange', e.target.value);
    setQuery(e.target.value);
  };
  const debouncedOnChange = debounce(onChange, 300);

  console.log('query:', query);

  return (
    <>
      <Search onClick={handleModalOpen} sx={{ input: { cursor: 'pointer' } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={open}>
        <TextField
          type="search"
          id="search"
          placeholder="Search..."
          onChange={debouncedOnChange}
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
              <React.Fragment key={idx}>
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
              </React.Fragment>
            );
          })}
        </List>
      </Dialog>
    </>
  );
};

export default SearchModal;
