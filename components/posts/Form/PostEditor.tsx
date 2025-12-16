'use client';

import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Descendant } from 'slate';

import { ImageInput } from '@/components/common/ImageInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IPostDetails } from '@/lib/features/posts/types';
import { getPostDescriptionContent } from '@/lib/features/posts/utility';

const RichTextEditor = dynamic(() => import('@/components/common/RichTextEditor'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface PostFormData {
  title: string;
  short_description: string;
}

const DEFAULT_VALUES = {
  title: '',
  short_description: '',
};

function getDefaultValue(defaultValue: IPostDetails | undefined): PostFormData {
  if (!defaultValue) {
    return DEFAULT_VALUES;
  }

  return {
    title: defaultValue.title,
    short_description: defaultValue.short_description,
  };
}

interface Props {
  value?: IPostDetails;
  slug?: string;
  onSubmitData: (data: any) => Promise<void>;
}

const PostEditor = (props: Props) => {
  const { value, onSubmitData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');

  const [postSlug, setPostSlug] = useState<string | null>(null);
  const [descriptionContent, setDescriptionContent] = useState<Descendant[]>([]);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: getDefaultValue(value),
  });

  useEffect(() => {
    if (value?.description && value?.slug) {
      setPostSlug(value.slug);
      setDescriptionContent(getPostDescriptionContent(value.description));
    }
    if (value?.cover_image) {
      setCoverImage(value.cover_image);
    }
  }, [value]);

  const handleDescriptionChange = (value: Descendant[]) => {
    setDescriptionContent(value);
    setDescriptionError(null);
  };

  const onSubmit = async (formData: PostFormData, publishNow: boolean = true) => {
    if (!descriptionContent.length) {
      setDescriptionError('Description is required');
      return;
    }

    const descriptionObj = { content: descriptionContent };

    const payload = {
      title: formData.title,
      cover_image: coverImage || null,
      short_description: formData.short_description,
      publish_now: publishNow,
      description: descriptionObj,
    };

    setIsLoading(true);
    await onSubmitData(payload);
    setIsLoading(false);
  };

  const formValidation = {
    title: register('title', {
      required: 'Title is required',
      minLength: { value: 5, message: 'Title must be at least 5 characters' },
    }),
    short_description: register('short_description', {
      required: 'Description is required',
      minLength: { value: 10, message: 'Description must be at least 10 characters' },
      maxLength: { value: 255, message: 'Description must not exceed 500 characters' },
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
            <RichTextEditor
              onChange={handleDescriptionChange}
              initialValue={descriptionContent}
              key={postSlug || 'new-post'}
            />
            {descriptionError && <p className="text-destructive text-sm">{descriptionError}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="cursor-pointer"
              onClick={handleSubmit((data) => onSubmit(data, false))}
            >
              Save as Draft
            </Button>
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
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
