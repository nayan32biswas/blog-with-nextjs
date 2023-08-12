import Image from 'next/image';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { uploadImage } from '@/api/utilsApi';
import { getFileUrl } from '@/utils';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Title should be of minimum 3 characters length')
    .required('Post should have a title'),
  short_description: yup.string(),
  cover_image: yup.string(),
  publish_at: yup.string(),
  description: yup.string().required('Post should have a description')
});

function PostForm() {
  const [coverImage, setCoverImage] = React.useState<string | null>(null);

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
      publish_at: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const isLoading = false;

  return (
    <>
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
                Upload
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
    </>
  );
}

export default PostForm;
