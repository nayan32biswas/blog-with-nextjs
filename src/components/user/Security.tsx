import { useRouter } from 'next/router';
import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { changePassword } from '@/api/userApi';

import PasswordField from '../auth/PasswordField';

const validationSchema = yup.object({
  current_password: yup.string().required('Password is required'),
  new_password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('new_password')], 'Your passwords do not match.')
});

function Security() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setErrors }) => {
      const payload = {
        current_password: values.current_password,
        new_password: values.new_password
      };

      setIsLoading(true);
      changePassword({ payload })
        .then(() => {
          setIsLoading(false);
          router.push(router.asPath).then(() => router.reload());
        })
        .catch((error: AxiosError) => {
          setIsLoading(false);
          const { errorField, message } = handleAxiosError(error);
          if (errorField) {
            setErrors({ [errorField]: message });
          } else if (error) {
            setFormError(message);
          }
        });
    }
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <PasswordField
        name="current_password"
        label="Current Password"
        value={formik.values.current_password}
        onChange={formik.handleChange}
        touched={formik.touched.current_password}
        error={formik.errors.current_password}
      />
      <PasswordField
        name="new_password"
        label="New Password"
        value={formik.values.new_password}
        onChange={formik.handleChange}
        touched={formik.touched.new_password}
        error={formik.errors.new_password}
      />
      <PasswordField
        name="confirm_password"
        label="Confirm Password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        touched={formik.touched.confirm_password}
        error={formik.errors.confirm_password}
      />

      {formError && (
        <FormHelperText error sx={{ fontSize: '16px', fontWeight: 'bold' }}>
          {formError}
        </FormHelperText>
      )}
      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Change Password
      </LoadingButton>
    </Box>
  );
}

export default Security;
