import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as yup from 'yup';

import StyledTextArea from '../utils/StyledTextArea';

const validationSchema = yup.object({
  description: yup.string().required('No value')
});

function CommentForm({
  handleSubmit,
  commentId,
  buttonName = 'Comment'
}: {
  /* eslint-disable */
  handleSubmit: (
    description: string,
    setIsLoading: any,
    setFormError: any,
    resetForm: any,
    commentId?: string
  ) => void;
  /* eslint-enable */
  commentId?: string;
  buttonName?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      handleSubmit(values.description, setIsLoading, setFormError, resetForm, commentId);
    }
  });
  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, maxWidth: '500px' }}
      >
        <StyledTextArea
          aria-label="Comment Box"
          minRows={3}
          placeholder="Write your comment"
          required
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          // error={formik.touched.description && Boolean(formik.errors.description)}
        />
        {formError && (
          <FormHelperText error sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {formError}
          </FormHelperText>
        )}
        <LoadingButton
          disabled={formik.touched.description && Boolean(formik.errors.description)}
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          {buttonName}
        </LoadingButton>
      </Box>
    </>
  );
}

export default CommentForm;
