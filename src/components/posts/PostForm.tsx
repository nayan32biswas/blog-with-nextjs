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

import { useFormik } from 'formik';
import * as yup from 'yup';

import { uploadImage } from '@/api/utilsApi';
import { IPostDetails } from '@/types/api.types';
import { ObjectType } from '@/types/common.types';
import { IPostForm } from '@/types/form.types';
import { getFileUrl } from '@/utils';

const getInitialValues = (postDetails?: IPostDetails): IPostForm => {
  let initialValues: IPostForm = {
    title: '',
    short_description: '',
    cover_image: '',
    description: '',
    publish_now: false
  };
  if (postDetails) {
    initialValues = {
      title: postDetails.title,
      short_description: postDetails.short_description,
      cover_image: postDetails.cover_image,
      description: postDetails.description,
      publish_now: !postDetails.publish_at === false
    };
  }
  // console.log('initialValues:', initialValues);
  return initialValues;
};

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Title should be of minimum 3 characters length')
    .required('Post should have a title'),
  short_description: yup.string(),
  cover_image: yup.string(),
  description: yup.string().required('Post should have a description')
});

interface Props {
  postDetails?: IPostDetails;
  // eslint-disable-next-line no-unused-vars
  handleSubmitPost: (payload: ObjectType, setIsLoading: any, setFormError: any) => void;
}

function PostForm({ postDetails, handleSubmitPost }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>, formik: any) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage({ image: file }).then((imagePath: string) => {
        formik.setFieldValue('cover_image', imagePath, true);
      });
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(postDetails),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: ObjectType = { ...values };
      if (payload.publish_now === true) {
        payload.publish_at = null;
      }
      setIsLoading(true);
      handleSubmitPost(payload, setIsLoading, setFormError);
    }
  });

  return (
    <>
      <Typography component="div">
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            name="title"
            label="Title"
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
                hidden
                accept="image/*"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUploadImage(event, formik)
                }
              />
            </label>
            {formik.values.cover_image && (
              <Image
                src={getFileUrl(formik.values.cover_image)}
                alt="Uploaded Image"
                height={300}
                width={300}
                // priority={true}
              />
            )}
          </Stack>
          <TextField
            margin="normal"
            fullWidth
            required
            name="short_description"
            label="Short Description"
            value={formik.values.short_description}
            onChange={formik.handleChange}
            error={formik.touched.short_description && Boolean(formik.errors.short_description)}
            helperText={formik.touched.short_description && formik.errors.short_description}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="description"
            label="Description"
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
      </Typography>
    </>
  );
}

export default PostForm;

/*
import React from 'react';

import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function PostForm() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Typography component="div">
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
        </Typography>
      </LocalizationProvider>
    </>
  );
}

*/
