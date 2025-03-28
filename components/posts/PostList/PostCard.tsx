import { Clock, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IPost } from "@/lib/features/posts/post.types";

interface PostCardProps {
  post: IPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border-gray-200 transition-all hover:shadow-md">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative h-48 md:h-full">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover" />
        </div>
        <div className="flex flex-col p-4 md:col-span-2">
          <CardContent className="flex-grow p-0">
            <Badge
              variant="outline"
              className="mb-2 border-gray-300 text-xs font-medium text-gray-700"
            >
              {post.category}
            </Badge>
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
              {post.author.name}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime}
            </div>
            <div>{post.date}</div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
