import React, { useState } from 'react';

import { Tooltip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line no-unused-vars
function TagInput({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) {
  const [value, setValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleTagAdd = () => {
    if (value.trim() && !tags.includes(value)) {
      setTags([...tags, value]);
      setValue('');
    }
  };

  return (
    <Tooltip title="Press Enter to add TAG">
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={tags}
        onChange={(_, newValue) => setTags(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            variant="outlined"
            value={value}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleTagAdd();
              }
            }}
          />
        )}
      />
      {/* <div>
        {tags.map((tag) => (
          <span key={tag} onClick={() => handleTagDelete(tag)}>
            {tag} &#x2715;
          </span>
        ))}
      </div> */}
    </Tooltip>
  );
}

export default TagInput;
