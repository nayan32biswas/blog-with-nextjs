import { Upload } from 'lucide-react';
import { ChangeEvent } from 'react';

import { Progress } from '@/components/ui/progress';
import { useImageUpload } from '@/lib/features/common/hooks/useImageUpload';
import { getMediaFullPath } from '@/lib/utils';

export function ImageInput({ value, onChange }) {
  const { uploadProgress, isUploading, uploadImage } = useImageUpload();

  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const [newUrl, errorMessage] = await uploadImage(e);
    if (newUrl) {
      onChange(newUrl);
    } else if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-start gap-4">
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2 w-full min-w-[100px]" />
        </div>
      )}
      <div className="flex-1">
        <div className="hover:bg-secondary/50 rounded-lg border-2 border-dashed p-4 transition-colors">
          <input
            type="file"
            id="cover-image"
            accept="image/*"
            onChange={handleCoverImageUpload}
            className="hidden"
          />
          <label htmlFor="cover-image" className="flex cursor-pointer flex-col items-center gap-2">
            <Upload className="text-muted-foreground h-8 w-8" />
            <span className="text-muted-foreground text-sm">Click to upload cover image</span>
          </label>
        </div>
      </div>
      {value && (
        <div className="relative h-40 w-40 overflow-hidden rounded-lg">
          <img
            src={getMediaFullPath(value)}
            alt="Cover preview"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
