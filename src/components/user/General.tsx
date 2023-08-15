import { useRouter } from 'next/router';
import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { deepOrange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { updateMe } from '@/api/userApi';
import { uploadImage } from '@/api/utilsApi';
import { IUserDetails } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';
import { getFileUrl } from '@/utils';

import Loading from '../utils/Loading';

interface IProps {
  user: IUserDetails;
}

const validationSchema = yup.object({
  full_name: yup.string().min(3, 'length should be getter then 3').required('Name is required'),
  cover_image: yup.string()
});

function General({ user }: IProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: ObjectType = { ...values };
      if (payload.publish_now === true) {
        payload.publish_at = null;
      }
      setIsLoading(true);
      updateMe({ payload })
        .then(() => {
          setIsLoading(false);
          router.push(router.asPath).then(() => router.reload());
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
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>, formik: any) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage({ image: file }).then((imagePath: string) => {
        formik.setFieldValue('image', imagePath, true);
      });
    }
  };

  const theme = useTheme();

  if (!user) return <Loading />;
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUploadImage(event, formik)}
        accept="image/*"
        style={{ display: 'none' }}
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: theme.spacing(30),
              height: theme.spacing(30)
            }}
            src={getFileUrl(formik.values.image)}
          >
            {user.full_name[0]}
          </Avatar>
        </IconButton>
      </label>

      <TextField
        margin="normal"
        fullWidth
        required
        name="full_name"
        label="Full Name"
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={formik.touched.full_name && Boolean(formik.errors.full_name)}
        helperText={formik.touched.full_name && formik.errors.full_name}
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
        Submit
      </LoadingButton>
    </Box>
  );
}

export default General;
