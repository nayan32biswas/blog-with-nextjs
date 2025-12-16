'use client';

import axios from 'axios';
import { ChangeEvent, useRef, useState } from 'react';

import api, { getAxiosErrorMessage } from '@/lib/axios';
import { API_URLS } from '@/lib/endpoints';
import { buildUrl } from '@/lib/utils';

interface UseImageUploadResult {
  uploadProgress: number;
  isUploading: boolean;
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<[string | null, string | null]>;
  cancel: () => void;
}

export function useImageUpload(): UseImageUploadResult {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      // We don't nullify the ref here, so we can check identity in finally
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<[string | null, string | null]> => {
    if (!e.target.files || !e.target.files.length) {
      return [null, 'No file selected'];
    }

    // Cancel any ongoing upload
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsUploading(true);
    setUploadProgress(0);

    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const url = buildUrl(API_URLS.uploadImage);
      const response = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: controller.signal,
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
    } catch (err: any) {
      if (axios.isCancel(err)) {
        return [null, null];
      }
      console.error(err);
      const errorMessage = getAxiosErrorMessage(err);

      return [null, errorMessage];
    } finally {
      // Only reset if this is the current controller
      if (abortControllerRef.current === controller) {
        setIsUploading(false);
      }
    }
  };

  return {
    uploadProgress,
    isUploading,
    uploadImage,
    cancel,
  };
}
