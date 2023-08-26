import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PostDeleteDialog({
  open,
  handleDelete
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (isDelete: boolean) => void;
}) {
  const handleAction = (e: any, value: boolean) => {
    // e.currentTarget.disabled = true;
    handleDelete(value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleDelete(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Do you want to delete this course?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This is not reverse able action.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e) => handleAction(e, false)}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => handleAction(e, true)} color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostDeleteDialog;
