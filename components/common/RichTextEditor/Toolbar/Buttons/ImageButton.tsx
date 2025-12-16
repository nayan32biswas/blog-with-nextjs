import { Image } from 'lucide-react';
import { useRef } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { useImageUpload } from '@/lib/features/common/hooks/useImageUpload';

import { ImageElement as ImageElementType } from '../../custom.types';
import { Button } from '../utility.component';

export default function ImageButton() {
  const editor = useSlate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImageUpload();

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files?.length) return;

    const [url, error] = await uploadImage(event);

    if (url) {
      const image: ImageElementType = {
        type: 'image',
        url,
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, image);
    } else if (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed: ' + error);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onMouseDown={(event: MouseEvent) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        <Image className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        accept="image/*"
      />
    </>
  );
}
