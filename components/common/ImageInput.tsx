import { Upload } from "lucide-react";

import { CommonApiService } from "@/lib/features/common/commonApi";
import { getMediaFullPath } from "@/lib/utils";

export function ImageInput({ value, onChange }) {
  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const [data, errorObj] = await CommonApiService.uploadImage({ formData });

      if (data) {
        onChange(data.image_path);
      } else {
        console.error("Error uploading image:", errorObj);
      }
    }
  };

  return (
    <div className="flex items-start gap-4">
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
