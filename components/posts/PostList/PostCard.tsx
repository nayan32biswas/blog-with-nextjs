import { Clock, User } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IPost } from "@/lib/features/posts/types";
import { getMediaFullPath, humanizeDate } from "@/lib/utils";

interface PostCardProps {
  post: IPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border-gray-200 transition-all hover:shadow-md">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative h-48 md:h-full">
          {post.cover_image && <img src={getMediaFullPath(post.cover_image)} alt={post.title} />}
        </div>
        <div className="flex flex-col p-4 md:col-span-2">
          <CardContent className="flex-grow p-0">
            <h3 className="mb-2 text-xl leading-tight font-bold text-gray-900">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="mb-4 text-gray-600">{post.short_description}</p>
          </CardContent>
          <CardFooter className="flex items-center space-x-4 p-0 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author.full_name}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {"000"}
            </div>
            <div>{humanizeDate(post.publish_at)}</div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
