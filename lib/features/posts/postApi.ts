import axios from "@/lib/axios";
import { API_URLS } from "@/lib/endpoints";
import { buildUrl } from "@/lib/utils";

export class PostApiService {
  static getTopics = async ({ queryParams }: any) => {
    try {
      const url = buildUrl(API_URLS.topics, null, queryParams);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };

  static getPosts = async ({ queryParams }: any) => {
    try {
      const url = buildUrl(API_URLS.posts, null, queryParams);
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };

  static getPostsDetails = async ({ slug }: any) => {
    try {
      const url = buildUrl(API_URLS.postsDetails, { slug });
      const response = await axios.get(url);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };

  static createPosts = async ({ payload }: any) => {
    try {
      const url = buildUrl(API_URLS.posts);
      const response = await axios.post(url, payload);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };

  static updatePosts = async ({ slug, payload }: any) => {
    try {
      const url = buildUrl(API_URLS.postsDetails, { slug });
      const response = await axios.patch(url, payload);

      return [response.data, null];
    } catch (error: any) {
      return [null, error?.response?.data];
    }
  };
}
