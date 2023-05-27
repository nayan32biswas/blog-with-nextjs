import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { login } from '@/api/authApi';
import AuthBase from '@/components/auth/AuthBase';
import PasswordField from '@/components/auth/PasswordField';
import { usernameRegex } from '@/utils/utils';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username should be of minimum 3 characters length')
    .required('Email is required')
    .matches(usernameRegex, 'Username should cannot contain white space and special character'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

function SignIn() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember_me: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    }
  });

  return (
    <AuthBase page={'SIGN_IN'}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          required
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              value={formik.values.remember_me}
              checked={formik.values.remember_me}
            />
          }
          label="Remember me"
          name="remember_me"
          onChange={formik.handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </AuthBase>
  );
}

// export default SignIn;
export default dynamic(() => Promise.resolve(SignIn), { ssr: false });
