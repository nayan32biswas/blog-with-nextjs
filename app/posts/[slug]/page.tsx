import { Metadata } from "next";
import Script from "next/script";
import { cache } from "react";

import PostDetails from "@/components/posts/PostDetails";
import { publicEnv } from "@/lib/config";
import { PostApiService } from "@/lib/features/posts/postApi";
import { IPostDetails } from "@/lib/features/posts/types";

const getPostDetailsUrl = (slug: string) => `${publicEnv.BASE_API_URL}/posts/${slug}/`;

const getBlogPostBySlug = cache(async (slug: string): Promise<[IPostDetails | null, any]> => {
  const [post, errorObj] = await PostApiService.getPostsDetails({ slug });
  return [post, errorObj];
});

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const [post, errorObj] = await getBlogPostBySlug(slug);

  if (!post || errorObj) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
      openGraph: {
        title: "Post Not Found",
        description: "The requested post could not be found.",
      },
    };
  }

  return {
    title: post.title,
    description: post.short_description,
    alternates: { canonical: getPostDetailsUrl(slug) },
    openGraph: {
      title: post.title,
      description: post.short_description,
      url: getPostDetailsUrl(slug),
      type: "article",
      images: [{ url: post.cover_image || "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.short_description,
      images: [post.cover_image || ""],
    },
  };
}

export default async function PostDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, errorObj] = await getBlogPostBySlug(slug);

  if (!post || errorObj) {
    return null;
  }

  return (
    <div>
      <Script
        id="post-details-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.short_description,
            image: post.cover_image,
            url: getPostDetailsUrl(slug),
            author: { "@type": "Person", name: post.author.full_name },
            datePublished: post.publish_at,
          }),
        }}
      />
      <PostDetails post={post} slug={slug} />
    </div>
  );
}
