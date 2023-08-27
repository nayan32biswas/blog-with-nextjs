import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fetchPosts } from '@/api/postApi';
import useDebounce from '@/hooks/debounceHook';
import { IPost, IPostList } from '@/types/api.types';

const classNames = {
  inputBox: {
    marginRight: '10px'
  }
};

const SearchBox = () => {
  const [query, setQuery] = React.useState('');
  const [posts, setPosts] = React.useState<IPost[]>([]);

  const debouncedRequest = useDebounce(300, () => {
    (async () => {
      if (query.length >= 2) {
        const postData: IPostList = await fetchPosts({ params: { page: 1, limit: 50, q: query } });
        setPosts(postData.results);
      } else if (query.length === 0) {
        setPosts([]);
      }
    })();
  });

  const onChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);

    debouncedRequest();
  };

  return (
    <Autocomplete
      disablePortal
      clearOnEscape
      options={posts}
      getOptionLabel={(option: IPost) => option.title}
      role="list-box"
      sx={{ width: 400, marginTop: '1px', marginBottom: '1px' }}
      renderOption={(props: unknown, option: IPost) => {
        return (
          <Typography component={'li'} key={option.slug} sx={classNames.inputBox}>
            <a style={{ marginRight: '20px' }} href={`/posts/${option.slug}`}>
              {option.title}
            </a>
          </Typography>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          label="Search"
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon aria-label="Search" />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

export default SearchBox;
