'use client';

import PostEditor from '@/components/posts/Form/PostEditor';
import { PostApiService } from '@/lib/features/posts/postApi';

const PostEditorPage = () => {
  const handleSubmitData = async (payload: any) => {
    const [data, errorObj] = await PostApiService.createPosts(payload);
    if (data) {
      window.location.href = `/posts/${data.slug}`;
    } else if (errorObj) {
      console.error(errorObj);
    }
  };

  return <PostEditor onSubmitData={handleSubmitData} />;
};

export default PostEditorPage;
