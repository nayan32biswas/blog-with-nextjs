import React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function PasswordField({ id, name, label, value, onChange, touched, error }: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      margin="normal"
      fullWidth
      required
      id={id}
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={touched && Boolean(error)}
      helperText={touched && error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

export default PasswordField;
