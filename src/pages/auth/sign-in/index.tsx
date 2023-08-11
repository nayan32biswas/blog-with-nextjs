import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { login } from '@/api/authApi';
import AuthBase from '@/components/auth/AuthBase';
import PasswordField from '@/components/auth/PasswordField';
import { UserContext } from '@/context/UserContext';
import { usernameRegex } from '@/utils';

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
  const router = useRouter();
  const { userDispatch } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember_me: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values)
        .then(() => {
          // const currentPath = router.pathname;
          // const { id } = router.query;
          const { next } = router.query;

          let toPath = '/';

          if (
            next &&
            typeof next === 'string' &&
            !next.includes('sign-in') &&
            !next.includes('sign-up')
          ) {
            toPath = next;
          }
          userDispatch({
            type: 'SET_AUTH',
            payload: {
              isAuthenticated: true
            }
          });
          console.log(toPath);
          router.push(toPath);

          // router.push(toPath).then(() => router.reload());
        })
        .catch((error: AxiosError) => {
          setIsLoading(false);
          const { message } = handleAxiosError(error);
          if (error) {
            setFormError(message);
          }
        });
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
        {formError && (
          <FormHelperText error sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {formError}
          </FormHelperText>
        )}
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
        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
      </Box>
    </AuthBase>
  );
}

// export default SignIn;
export default dynamic(() => Promise.resolve(SignIn), { ssr: false });
