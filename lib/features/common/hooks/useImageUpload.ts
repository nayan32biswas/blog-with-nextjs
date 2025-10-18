'use client';

import { ChangeEvent, useState } from 'react';

import api, { getAxiosErrorMessage } from '@/lib/axios';
import { API_URLS } from '@/lib/endpoints';
import { buildUrl } from '@/lib/utils';

interface UseImageUploadResult {
  uploadProgress: number;
  isUploading: boolean;
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<[string | null, string | null]>;
}

export function useImageUpload(): UseImageUploadResult {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<[string | null, string | null]> => {
    if (!e.target.files || !e.target.files.length) {
      return [null, 'No file selected'];
    }

    setIsUploading(true);
    setUploadProgress(0);

    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const url = buildUrl(API_URLS.uploadImage);
      const response = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          let progress = 0;
          if (progressEvent.total) {
            progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
          setUploadProgress(progress);
        },
      });

      const uploadedUrl = response.data.image_path;

      return [uploadedUrl, null];
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);

      return [null, errorMessage];
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadProgress,
    isUploading,
    uploadImage,
  };
}
