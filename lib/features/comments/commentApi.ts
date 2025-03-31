import axios from "@/lib/axios";
import { API_URLS } from "@/lib/endpoints";
import { buildUrl } from "@/lib/utils";

export class CommentApiService {
  static getComments = async ({ slug, queryParams }: any = {}) => {
    try {
      const url = buildUrl(API_URLS.comments, { slug }, queryParams);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };
}
