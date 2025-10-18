'use client';

import { Clock, Edit, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import type { IPost } from '@/lib/features/posts/types';
import { getMediaFullPath } from '@/lib/utils';
import { humanizeDate, utcToLocal } from '@/lib/utils/datetime';

interface PostCardProps {
  post: IPost;
}

export function PostCard({ post }: PostCardProps) {
  const { authUser } = useAuth();

  const postUrl = `/posts/${post.slug}`;

  const renderEditButton = () => {
    const selfPost = authUser?.username === post.author.username;
    if (!selfPost) {
      return null;
    }

    return (
      <div className="absolute top-2 right-2 z-10">
        <Link href={`/posts/${post.slug}/edit`}>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 cursor-pointer border border-gray-200 bg-white p-0 shadow-sm hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Edit post</span>
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <Card className="group relative overflow-hidden border-gray-200 py-2 transition-all hover:shadow-md">
      {renderEditButton()}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="relative h-32 sm:h-full">
          {post.cover_image && <img src={getMediaFullPath(post.cover_image)} alt={post.title} />}
        </div>
        <div className="flex flex-col p-2 md:col-span-2 md:p-1">
          <CardContent className="h-28 p-0">
            <h4 className="mb-2 text-xl leading-tight font-bold text-gray-700" title={post.title}>
              <Link
                href={postUrl}
                className="line-clamp-1 overflow-hidden text-ellipsis hover:underline"
              >
                {post.title}
              </Link>
            </h4>
            <p
              className="mb-2 line-clamp-3 overflow-hidden text-sm text-ellipsis"
              title={post.short_description}
            >
              {post.short_description}
            </p>
          </CardContent>
          <CardFooter className="space-x-4 p-0 text-xs text-gray-400">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author.full_name}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {'000'}
            </div>
            <div>{humanizeDate(utcToLocal(post.publish_at))}</div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
