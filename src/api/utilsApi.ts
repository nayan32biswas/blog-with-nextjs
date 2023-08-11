import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import { UPLOAD_IMAGE_URL } from './endpoints';

export async function uploadImage({ image }: { image: File }) {
  const config = await getAuthConfig();
  config.headers = {
    ...config.headers,
    'Content-Type': 'multipart/form-data'
  };

  const formData = new FormData();
  formData.append('image', image);

  try {
    const res = await Axios.post(UPLOAD_IMAGE_URL, formData, config);
    return res.data.image_path as string;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
