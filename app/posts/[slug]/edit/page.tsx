"use client";

import { useParams } from "next/navigation";
import React from "react";

import PostEditor from "@/components/posts/Form/PostEditor";
import { PostApiService } from "@/lib/features/posts/postApi";

export default function EditPostPage() {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [postDetails, setPostDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchPostDetails = async () => {
      setIsLoading(true);
      const [data] = await PostApiService.getPostsDetails({ slug });
      if (data) setPostDetails(data);
      setIsLoading(false);
    };

    fetchPostDetails();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!postDetails) {
    return null;
  }

  return <PostEditor defaultValue={postDetails} />;
}
