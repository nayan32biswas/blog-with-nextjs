"use client";

import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Hash,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { blogPosts } from "@/lib/temp_data";

export default function PostDetails({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: number]: boolean }>({});

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

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId],
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // In a real app, you would make an API call here
    console.log("Adding comment:", newComment);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    const reply = replyContent[commentId];
    if (!reply?.trim()) return;
    // In a real app, you would make an API call here
    console.log("Adding reply to comment", commentId, ":", reply);
    setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
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
              {post.category}
            </Badge>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-4 text-sm text-white">
                <span>{post.author.name}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <span>•</span>
                <span>{post.date}</span>
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
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold">Comments</h2>

              {/* Add Comment */}
              <div className="mb-8">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {post.comments?.map((comment) => (
                  <div key={comment.id} className="bg-card rounded-lg p-6">
                    {/* Comment Header */}
                    <div className="mb-4 flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{comment.author.name}</h4>
                          <span className="text-muted-foreground text-sm">{comment.date}</span>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                      </div>
                    </div>

                    {/* Comment Actions */}
                    <div className="ml-14 flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowReplyInput((prev) => ({
                            ...prev,
                            [comment.id]: !prev[comment.id],
                          }))
                        }
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      {comment.replies.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => toggleReplies(comment.id)}>
                          {expandedComments.includes(comment.id) ? (
                            <ChevronUp className="mr-2 h-4 w-4" />
                          ) : (
                            <ChevronDown className="mr-2 h-4 w-4" />
                          )}
                          {comment.replies.length}{" "}
                          {comment.replies.length === 1 ? "reply" : "replies"}
                        </Button>
                      )}
                    </div>

                    {/* Reply Input */}
                    {showReplyInput[comment.id] && (
                      <div className="mt-4 ml-14">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyContent[comment.id] || ""}
                          onChange={(e) =>
                            setReplyContent((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                          className="mb-4"
                        />
                        <Button
                          onClick={() => handleAddReply(comment.id)}
                          disabled={!replyContent[comment.id]?.trim()}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Post Reply
                        </Button>
                      </div>
                    )}

                    {/* Replies */}
                    {expandedComments.includes(comment.id) && comment.replies.length > 0 && (
                      <div className="mt-4 ml-14 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-muted rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reply.author.avatar} />
                                <AvatarFallback>{reply.author.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{reply.author.name}</h4>
                                  <span className="text-muted-foreground text-sm">
                                    {reply.date}
                                  </span>
                                </div>
                                <p className="mt-2">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{post.author.name}</h4>
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
