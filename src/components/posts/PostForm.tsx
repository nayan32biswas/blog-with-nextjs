import Image from 'next/image';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';

import { uploadImage } from '@/api/utilsApi';
import { ObjectType } from '@/types/common.types';
import { getFileUrl } from '@/utils';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Title should be of minimum 3 characters length')
    .required('Post should have a title'),
  short_description: yup.string(),
  cover_image: yup.string(),
  publish_at: yup.date().nullable().min(moment(), 'Please choose future date'),
  description: yup.string().required('Post should have a description')
});

function PostForm({ handleCreatePost }: any) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState('');

  function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage({ image: file }).then((imagePath: string) => {
        console.log(imagePath);
        setCoverImage(imagePath);
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      short_description: '',
      cover_image: '',
      description: '',
      publish_at: null,
      publish_now: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: ObjectType = { ...values, cover_image: coverImage };
      if (payload.publish_now === true) {
        payload.publish_at = null;
      }
      setIsLoading(true);
      handleCreatePost(payload, setIsLoading, setFormError);
    }
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Typography component={'div'}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="title"
              name="title"
              label="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Cover Image
                </Button>
                <input
                  id="upload-image"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadImage}
                />
              </label>
              {coverImage && (
                <Image src={getFileUrl(coverImage)} alt="Uploaded Image" height="300" width={300} />
              )}
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              required
              id="description"
              name="description"
              label="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <FormControlLabel
              label="Publish Now"
              name="publish_now"
              onChange={formik.handleChange}
              control={
                <Checkbox
                  color="primary"
                  value={formik.values.publish_now}
                  checked={formik.values.publish_now}
                />
              }
            />

            {formik.values.publish_now == false && (
              <DateTimePicker
                label="Publish date-time picker"
                value={formik.values.publish_at}
                onChange={(value) => formik.setFieldValue('publish_at', value, true)}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    error={formik.touched.publish_at && Boolean(formik.errors.publish_at)}
                    helperText={(formik.touched.publish_at && formik.errors.publish_at) || ''}
                  />
                )}
              />
            )}

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
              Create Post
            </LoadingButton>
          </Box>
        </Typography>
      </LocalizationProvider>
    </>
  );
}

export default PostForm;
