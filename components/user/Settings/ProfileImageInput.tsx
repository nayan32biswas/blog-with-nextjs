import { User } from "lucide-react";
import React, { ChangeEvent } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useImageUpload } from "@/lib/features/common/hooks/useImageUpload";
import { getMediaFullPath } from "@/lib/utils";

interface Props {
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
}

export default function ProfileImageInput(props: Props) {
  const { value: profileImage, onChange } = props;

  const { uploadProgress, isUploading, uploadImage } = useImageUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const [newUrl, errorMessage] = await uploadImage(e);
    if (newUrl) {
      onChange(newUrl);
    } else if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Avatar className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-100">
        <AvatarImage src={getMediaFullPath(profileImage)} alt="Profile picture" />
        <AvatarFallback>
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2 w-full min-w-[100px]" />
        </div>
      )}
      <div>
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Change avatar
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
