import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import CommentForm, { IHandleCommentSubmit } from './CommentForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function CommentEditModal({
  open,
  setOpen,
  onConfirm,
  description,
  commentId,
  replyId
}: {
  title: string;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (payload: IHandleCommentSubmit) => void;
  description: string;
  commentId: string;
  replyId?: string;
}) {
  const handleConfirm = (data: IHandleCommentSubmit) => {
    setOpen(false);
    onConfirm(data);
  };

  return (
    <BootstrapDialog
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update {replyId ? 'Reply' : 'Comment'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <CommentForm
          handleSubmit={handleConfirm}
          buttonName={'Save'}
          description={description}
          commentId={commentId}
          replyId={replyId}
        />
      </DialogContent>
    </BootstrapDialog>
  );
}

export default CommentEditModal;
