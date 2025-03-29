"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_ITEMS_LIMIT, MIN_ITEMS_LIMIT } from "@/lib/config";
import { PostAction } from "@/lib/features/posts/postsSlice";
import { RootState } from "@/lib/store";

import { PostCard } from "./PostCard";
import { MobileTopicsDrawer } from "./topic/MobileTopicsDrawer";
import { TopicsBlock } from "./topic/TopicsBlock";

export default function PostListContainer() {
  const dispatch = useDispatch();

  const { postsApiData, topicsApiData } = useSelector((state: RootState) => state.posts);

  const topics = topicsApiData.results || [];
  const posts = postsApiData.results || [];

  const loadTopics = async () => {
    const queryParams = { limit: MIN_ITEMS_LIMIT };
    dispatch(PostAction.getTopics({ queryParams }));
  };

  const loadPosts = async () => {
    const queryParams = { limit: DEFAULT_ITEMS_LIMIT };
    dispatch(PostAction.getPosts({ queryParams }));
  };

  React.useEffect(() => {
    loadTopics();
    loadPosts();
  }, []);

  return (
    <section>
      {/* Latest Articles Header with Topics Button for Mobile */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
        <div className="lg:hidden">
          <MobileTopicsDrawer topics={topics} />
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-8">
            {posts.map((post) => (
              <PostCard key={`post-${post.slug}`} post={post} />
            ))}
          </div>
        </div>

        <div className="hidden space-y-8 lg:block">
          <TopicsBlock topics={topics} />
        </div>
      </div>
    </section>
  );
}
