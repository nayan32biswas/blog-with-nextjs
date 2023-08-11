import { IMinimalUser } from '@/types/api.types';

import Axios from './apiUtils/AxiosConfig';
import { getAuthConfig } from './apiUtils/auth';
import { USER_DETAILS_URL } from './endpoints';

export async function getPublicUserProfile({ username }: { username: string }) {
  const config = await getAuthConfig();
  try {
    const res = await Axios.get(USER_DETAILS_URL(username), config);
    return res.data as IMinimalUser;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
