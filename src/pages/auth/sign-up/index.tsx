import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { registration } from '@/api/authApi';
import AuthBase from '@/components/auth/AuthBase';
import PasswordField from '@/components/auth/PasswordField';
import { usernameRegex } from '@/utils';

const validationSchema = yup.object({
  full_name: yup
    .string()
    .min(3, 'Username should be of minimum 3 characters length')
    .required('Full Name is required'),
  username: yup
    .string()
    .min(3, 'Username should be of minimum 3 characters length')
    .required('Username is required')
    .matches(usernameRegex, 'Username should cannot contain white space and special character'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
});

function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      username: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setErrors }) => {
      setIsLoading(true);
      registration(values)
        .then(() => {
          const { next } = router.query;
          if (next && typeof next === 'string') {
            router.push(`/auth/sign-in?next=${next}`);
          } else {
            router.push(`/auth/sign-in`);
          }
        })
        .catch((error: any) => {
          setIsLoading(false);
          const { errorField, message } = handleAxiosError(error);
          console.log(errorField, message);
          if (errorField) {
            setErrors({ [errorField]: message });
          }
        });
    }
  });

  return (
    <AuthBase page={'SIGN_UP'}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          // focused
          fullWidth
          required
          margin="normal"
          id="full_name"
          name="full_name"
          label="Full Name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
        />
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
        <PasswordField
          id="confirm_password"
          name="confirm_password"
          label="Confirm Password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          touched={formik.touched.confirm_password}
          error={formik.errors.confirm_password}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
      </Box>
    </AuthBase>
  );
}

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
