import axios, { serverApi } from "@/lib/axios";
import { API_URLS } from "@/lib/endpoints";
import { buildUrl } from "@/lib/utils";

export class PostApiService {
  static getTopics = async ({ queryParams }: any) => {
    try {
      const url = buildUrl(API_URLS.topics, null, queryParams);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };

  static getPosts = async ({ queryParams }: any) => {
    try {
      const url = buildUrl(API_URLS.posts, null, queryParams);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };

  static getPostsDetails = async ({ slug, isServer = false, queryParams }: any) => {
    try {
      const axiosInstance = isServer ? serverApi : axios;

      const url = buildUrl(API_URLS.postsDetails, { slug }, queryParams);
      const response = await axiosInstance.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };

  static createPosts = async ({ payload }: any) => {
    console.log("payload", payload);
    try {
      const url = buildUrl(API_URLS.posts);
      const response = await axios.post(url, payload);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response.data];
    }
  };
}
