import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Descendant } from "slate";

import { ImageInput } from "@/components/common/ImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostApiService } from "@/lib/features/posts/postApi";
import { localTimeToUTC } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("@/components/common/RichTextEditor"), {
  ssr: false,
  loading: () => <div>Loading</div>,
});

interface PostFormData {
  title: string;
  publish_at: string;
  short_description: string;
}

const PostEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");

  const [description, setDescription] = useState<Descendant[]>([]);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      publish_at: "",
      short_description: "",
    },
  });

  const handleDescriptionChange = (value: Descendant[]) => {
    setDescription(value);
    setDescriptionError(null);
  };

  const onSubmit = async (formData: PostFormData, publishNow: boolean = true) => {
    if (!description.length) {
      setDescriptionError("Description is required");
      return;
    }

    const descriptionString = JSON.stringify(description);
    const publishDate = localTimeToUTC(formData.publish_at);

    const payload = {
      title: formData.title,
      cover_image: coverImage || null,
      publish_at: publishDate,
      short_description: formData.short_description,
      publish_now: publishNow,
      description: descriptionString,
    };

    setIsLoading(true);
    const [data, errorObj] = await PostApiService.createPosts({ payload });
    if (data) {
      window.location.href = `/posts/${data.slug}`;
    } else if (errorObj) {
      console.error(errorObj);
    }
    setIsLoading(false);
  };

  const formValidation = {
    title: register("title", {
      required: "Title is required",
      minLength: { value: 5, message: "Title must be at least 5 characters" },
    }),
    publish_at: register("publish_at", { required: false }),
    short_description: register("short_description", {
      required: "Description is required",
      minLength: { value: 10, message: "Description must be at least 10 characters" },
      maxLength: { value: 255, message: "Description must not exceed 500 characters" },
    }),
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Create New Post</h1>

        <form className="space-y-8" onSubmit={handleSubmit((data) => onSubmit(data, true))}>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post Title"
              className="text-2xl font-bold"
              {...formValidation.title}
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image</Label>
            <ImageInput value={coverImage} onChange={setCoverImage} />
          </div>

          {/* Publish Date */}
          <div className="space-y-2">
            <Label htmlFor="publish-date">Publish Date</Label>
            <Input id="publish-date" type="datetime-local" {...formValidation.publish_at} />
            {errors.publish_at && (
              <p className="text-destructive text-sm">{errors.publish_at.message}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea
              id="short_description"
              placeholder="Write a brief short_description of your post..."
              className="h-16"
              {...formValidation.short_description}
            />
            {errors.short_description && (
              <p className="text-destructive text-sm">{errors.short_description.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor onChange={handleDescriptionChange} />
            {descriptionError && <p className="text-destructive text-sm">{descriptionError}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={handleSubmit((data) => onSubmit(data, false))}
            >
              Save as Draft
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
