import React from 'react';

import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { uploadImage } from '@/api/utilsApi';
import { ObjectType } from '@/types/common.types';

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, minWidth: '100px' }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.error">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface IProps {
  id?: string;
  accept?: string;
  style?: ObjectType;
  className?: string;

  // eslint-disable-next-line no-unused-vars
  onSubmit: (imagePath: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeProgress?: (progress: number) => void;
}

function FileInput({ onSubmit, onChangeProgress, id, accept, style, className }: IProps) {
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  React.useEffect(() => {
    if (onChangeProgress) {
      onChangeProgress(uploadProgress);
    }
  }, [uploadProgress, onChangeProgress]);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      uploadImage({ image: file, setUploadProgress }).then((imagePath: string) => {
        onSubmit(imagePath);
        setUploadProgress(0);
      });
    }
  };
  return (
    <input
      onChange={handleUploadImage}
      accept={accept}
      id={id}
      style={style}
      className={className}
      type="file"
    />
  );
}

export default FileInput;
