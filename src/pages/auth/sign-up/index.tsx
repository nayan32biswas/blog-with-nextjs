import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AuthBase from '@/components/auth/AuthBase';
import { usernameRegex } from '@/utils/utils';

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
  const formik = useFormik({
    initialValues: {
      full_name: '',
      username: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <AuthBase page={'SIGN_UP'}>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          focused
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
        <TextField
          margin="normal"
          fullWidth
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          id="confirm_password"
          name="confirm_password"
          label="Confirm Password"
          type="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
          helperText={formik.touched.confirm_password && formik.errors.confirm_password}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </AuthBase>
  );
}

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
