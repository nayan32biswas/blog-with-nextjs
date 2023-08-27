import { useRouter } from 'next/router';
import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '@/context/UserContext';

import StyledTextArea from '../utils/StyledTextArea';

export interface IHandleCommentSubmit {
  description: string;
  setIsLoading: any;
  setFormError: any;
  resetForm: any;
  commentId?: string;
  replyId?: string;
}

export interface ICommentFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (data: IHandleCommentSubmit) => void;
  buttonName?: string;
  description?: string;
  commentId?: string;
  replyId?: string;
}
const validationSchema = yup.object({
  description: yup.string().required('Description is required')
});

function CommentForm({
  handleSubmit,
  buttonName = 'Comment',
  description = '',
  commentId,
  replyId
}: ICommentFormProps) {
  const router = useRouter();
  const { userState } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      description: description
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const data = {
        description: values.description,
        setIsLoading,
        setFormError,
        resetForm,
        commentId,
        replyId
      };
      handleSubmit(data);
    }
  });
  let errorMessage = formik.touched?.description && formik.errors?.description;

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
          onClick={() => {
            if (userState.auth.isAuthenticated == false)
              router.push(`/auth/sign-up?next=${router.asPath}`);
          }}
          // error={formik.touched.description && Boolean(formik.errors.description)}
          // helperText={formik.touched.description && formik.errors.description}
        />
        {formError && (
          <FormHelperText error sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {formError}
          </FormHelperText>
        )}
        {errorMessage && (
          <FormHelperText error sx={{ fontSize: '12px' }}>
            {errorMessage}
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
