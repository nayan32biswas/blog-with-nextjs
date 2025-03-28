import PostDetails from "@/components/posts/PostDetails";

export default async function PostDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <PostDetails slug={slug} />;
}
