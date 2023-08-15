import React, { useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
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

  const handleTagDelete = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  console.log(tags);

  return (
    <div>
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
              if (e.key === 'Enter' || e.key === 'Tab') {
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
    </div>
  );
};

export default TagInput;
