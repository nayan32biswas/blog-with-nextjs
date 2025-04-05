import axios from "@/lib/axios";
import { API_URLS } from "@/lib/endpoints";
import { buildUrl } from "@/lib/utils";

export class CommonApiService {
  static uploadImage = async ({ formData }) => {
    try {
      const url = buildUrl(API_URLS.uploadImage);
      const response = await axios.post(url, formData);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };
}
