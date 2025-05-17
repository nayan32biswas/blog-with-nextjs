"use client";

import { Clock, Edit, Hash, Share2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { IPostDetails } from "@/lib/features/posts/types";
import { getPostDescriptionContent, isSelfPost } from "@/lib/features/posts/utility";
import { getMediaFullPath, getNameInitials } from "@/lib/utils";
import { humanizeDate, utcToLocal } from "@/lib/utils/datetime";

import CommentContainer from "./CommentContainer";

const RichTextEditor = dynamic(() => import("@/components/common/RichTextEditor"), {
  ssr: false,
  loading: () => <div>Loading</div>,
});

interface PostDetailsProps {
  post: IPostDetails;
  slug: string;
}

export default function PostDetails({ post, slug }: PostDetailsProps) {
  const { authUser } = useAuth();

  const postDescriptionContent = useMemo(
    () => getPostDescriptionContent(post.description),
    [post.description],
  );

  const nameInitials = getNameInitials(post.author?.full_name);

  const renderEditButton = () => {
    if (!isSelfPost(authUser?.username, post.author?.username)) {
      return null;
    }

    return (
      <Link href={`/posts/${post.slug}/edit`}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </Link>
    );
  };

  const renderAuthorInfo = () => {
    return (
      <div className="bg-card mt-8 mb-4 rounded-lg p-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <Link href={`/${post.author.username}`}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.image || ""} />
                <AvatarFallback>{nameInitials}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h4 className="font-medium">
                <Link href={`/${post.author.username}`}>{post.author.full_name}</Link>
              </h4>
              <p className="text-muted-foreground text-sm">
                Technical writer and software developer with a passion for creating educational
                content.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full cursor-pointer md:w-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Share this post
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Cover Image */}
      {post.cover_image && (
        <div className="h-[50vh] w-full overflow-hidden">
          <img
            src={getMediaFullPath(post.cover_image)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Post Metadata */}
      <div className="container mx-auto px-4 pt-4">
        <div className="mx-auto max-w-3xl border-b pb-2">
          <div className="mb-4 flex items-start justify-between">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            {renderEditButton()}
          </div>

          <p className="text-muted-foreground mb-4 text-xl">{post.short_description}</p>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {"000"}
            </div>
            <span>•</span>
            <span>{humanizeDate(utcToLocal(post.publish_at))}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Topics */}
          <div className="mb-8 flex flex-wrap gap-2">
            {post.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="flex items-center">
                <Hash className="mr-1 h-3 w-3" />
                {topic}
              </Badge>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <RichTextEditor initialValue={postDescriptionContent} readOnly />
          </div>
          {renderAuthorInfo()}
          <CommentContainer slug={slug} />
        </div>
      </main>
    </div>
  );
}
