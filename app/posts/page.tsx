import React from "react";

import PostListContainer from "@/components/posts/PostList/PostListContainer";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PostListContainer />
    </main>
  );
}
