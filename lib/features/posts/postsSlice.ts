import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { IPost } from "./post.types";

interface PostsState {
  posts: IPost[];
  filteredPosts: IPost[];
  searchTerm: string;
  selectedTopic: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  searchTerm: "",
  selectedTopic: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPosts = state.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          post?.description?.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    setSelectedTopic: (state, action: PayloadAction<string | null>) => {
      state.selectedTopic = action.payload;
      if (action.payload) {
        state.filteredPosts = state.posts.filter(
          (post) => post.category.toLowerCase() === action.payload?.toLowerCase(),
        );
      } else {
        state.filteredPosts = state.posts;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setSearchTerm, setSelectedTopic, setLoading, setError } =
  postsSlice.actions;

export default postsSlice.reducer;
