import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import { POSTS_URL } from './endpoints';

export async function fetchPosts(SSContext: any = null) {
  const { config } = await getAuthConfig(SSContext);
  try {
    const res = await Axios.get(POSTS_URL, config);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
