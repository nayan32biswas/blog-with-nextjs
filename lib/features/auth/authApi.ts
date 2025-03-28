import axios from "@/lib/axios";
import { API_URLS } from "@/lib/endpoints";
import { buildUrl } from "@/lib/utils";

export class AuthApiService {
  static getCurrentUser = async () => {
    try {
      const url = buildUrl(API_URLS.userInfo);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };
  static registration = async (formData: any) => {
    try {
      const url = buildUrl(API_URLS.registration);
      const response = await axios.post(url, formData);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };
}
