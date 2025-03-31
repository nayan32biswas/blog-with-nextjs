"use client";

import { ChevronDown, ChevronUp, MessageCircle, Send } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MIN_ITEMS_LIMIT } from "@/lib/config";
import { CommentAction } from "@/lib/features/comments/commentsSlice";
import { RootState } from "@/lib/store";
import { getNameInitials } from "@/lib/utils";

export default function CommentContainer({ slug }: { slug: string }) {
  const dispatch = useDispatch();

  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  const commentsApiData = useSelector((state: RootState) => state.comments.postsCommentData[slug]);

  const comments = commentsApiData?.results || [];

  React.useEffect(() => {
    const loadComments = async () => {
      const queryParams = { limit: MIN_ITEMS_LIMIT };
      dispatch(CommentAction.getComments({ slug, queryParams }));
    };

    loadComments();
  }, [dispatch, slug]);

  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId],
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // In a real app, you would make an API call here
    setNewComment("");
  };

  const handleAddReply = (commentId: string) => {
    const reply = replyContent[commentId];
    if (!reply?.trim()) return;
    // In a real app, you would make an API call here
    setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
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
        {comments?.map((comment) => (
          <div key={`comment--${comment.id}`} className="bg-card rounded-lg p-6">
            {/* Comment Header */}
            <div className="mb-4 flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.image || ""} />
                <AvatarFallback>{getNameInitials(comment.user.full_name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.user.full_name}</h4>
                  <span className="text-muted-foreground text-sm">{comment.created_at}</span>
                </div>
                <p className="mt-2">{comment.description}</p>
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
                  {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
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
                  <div key={`reply--${reply.id}`} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.user.image || ""} />
                        <AvatarFallback>{getNameInitials(reply.user.full_name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{reply.user.full_name}</h4>
                          <span className="text-muted-foreground text-sm">{reply.created_at}</span>
                        </div>
                        <p className="mt-2">{reply.description}</p>
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
  );
}
