"use client";

import { ArrowLeft, Clock, Hash, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostAction } from "@/lib/features/posts/postsSlice";
import { RootState } from "@/lib/store";
import { getNameInitials } from "@/lib/utils";

import CommentContainer from "./CommentContainer";

export default function PostDetails({ slug }: { slug: string }) {
  const dispatch = useDispatch();

  const { postsDetailsApiData } = useSelector((state: RootState) => state.posts);

  const { data: post } = postsDetailsApiData;

  React.useEffect(() => {
    const loadPostsDetails = async () => {
      dispatch(PostAction.getPostsDetails({ slug }));
    };

    loadPostsDetails();
  }, [dispatch, slug]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const nameInitials = getNameInitials(post.author?.full_name);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Link href="/">
              <Button variant="outline" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <Badge variant="secondary" className="mb-4">
              {post.short_description}
            </Badge>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.image || ""} />
                <AvatarFallback>{post.author.full_name}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-4 text-sm text-white">
                <span>{post.author.full_name}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {"000"}
                </div>
                <span>•</span>
                <span>{post.publish_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Topics */}
            <div className="mb-8 flex flex-wrap gap-2">
              {post?.topics?.map((topic) => (
                <Badge key={topic} variant="outline" className="flex items-center">
                  <Hash className="mr-1 h-3 w-3" />
                  {topic}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground mb-8 text-xl">{post.description}</p>
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h2>Main Content</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
              <h2>Conclusion</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Comments Section */}
            <CommentContainer slug={slug} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <Button variant="outline" className="mb-4 w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share this post
              </Button>
              <Separator className="my-8" />
              <h3 className="mb-4 text-lg font-semibold">About the Author</h3>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.image || ""} />
                  <AvatarFallback>{nameInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{post.author.full_name}</h4>
                  <p className="text-muted-foreground text-sm">
                    Technical writer and software developer with a passion for creating educational
                    content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
