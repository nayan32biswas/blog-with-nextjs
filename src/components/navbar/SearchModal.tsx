import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import debounce from 'lodash/debounce';

import { fetchPosts } from '@/api/postApi';
import { IPost, IPostList } from '@/types/api.types';

const SearchModal = () => {
  const [query, setQuery] = React.useState('');
  const [posts, setPosts] = React.useState<IPost[]>([]);
  React.useEffect(() => {
    (async () => {
      if (query.length > 2) {
        const postData: IPostList = await fetchPosts({ params: { page: 1, limit: 50, q: query } });
        console.log('postData.results', postData.results.length);
        setPosts(postData.results);
      }
    })();
  }, [query]);

  const onChange = (e: any) => {
    // send data from input field to the backend here
    // will be triggered 500 ms after the user stopped typing
    setQuery(e.target.value);
  };
  const debouncedOnChange = debounce(onChange, 300);

  console.log('post', posts.length);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      clearOnEscape
      options={posts}
      getOptionLabel={(option: IPost) => option.title}
      role="list-box"
      sx={{ width: 400, marginTop: '1px', marginBottom: '1px' }}
      renderOption={(props: unknown, option: IPost) => {
        return (
          <Typography component={'li'} key={option.slug} sx={{ marginBottom: '10px' }}>
            <a href={`/posts/${option.slug}`}>{option.title}</a>
          </Typography>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={debouncedOnChange}
          label="Search"
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

export default SearchModal;
