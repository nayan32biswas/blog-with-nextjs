import axios from '@/lib/axios';
import { API_URLS } from '@/lib/endpoints';
import { buildUrl } from '@/lib/utils';

export class UserApiService {
  static getUserPublicProfile = async ({ username }: any) => {
    try {
      const url = buildUrl(API_URLS.userPublicProfile, { username });
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };
  static getUserDetails = async () => {
    try {
      const url = buildUrl(API_URLS.userUserDetails);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };
  static updateUser = async (payload: any) => {
    try {
      const url = buildUrl(API_URLS.userUpdate);
      const response = await axios.patch(url, payload);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };
}
