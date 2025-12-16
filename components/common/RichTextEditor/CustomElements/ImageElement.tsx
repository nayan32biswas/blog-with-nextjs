import React, { useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useFocused, useSelected, useSlate } from 'slate-react';
import { css } from '@emotion/css';

import { getMediaFullPath } from '@/lib/utils';

import { ImageElement as ImageElementType } from '../custom.types';

export default function ImageElement({ attributes, children, element }: RenderElementProps) {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const imageElement = element as ImageElementType;

  const width = imageElement.width || 300; // Default width

  // To show live resize, we need local state for the width while dragging.
  // Let's refine the handler.
  const [localWidth, setLocalWidth] = useState<number | null>(null);

  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const diff = currentX - startX;
      const newW = Math.max(100, Math.round(startWidth + diff));
      setLocalWidth(newW);
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Calculate final width
      const endX = upEvent.clientX;
      const diff = endX - startX;
      const newW = Math.max(100, Math.round(startWidth + diff));

      setLocalWidth(null);

      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, { width: newW }, { at: path });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const displayWidth = localWidth ?? width;

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className={css`
          position: relative;
          width: ${displayWidth}px;
          margin: 10px 0;
          margin-left: ${imageElement.align === 'center' || imageElement.align === 'right'
            ? 'auto'
            : '0'};
          margin-right: ${imageElement.align === 'center' || imageElement.align === 'left'
            ? 'auto'
            : '0'};
          box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
        `}
      >
        <img
          src={getMediaFullPath(imageElement.url)}
          alt=""
          className={css`
            display: block;
            width: 100%;
            height: auto;
          `}
        />

        {/* Resize Handle */}
        <div
          onMouseDown={onResizeStart}
          className={css`
            width: 10px;
            height: 10px;
            background-color: #333;
            position: absolute;
            bottom: 0;
            right: 0;
            cursor: nwse-resize;
            border: 1px solid white;
            opacity: ${selected && focused ? 1 : 0};
            transition: opacity 0.2s;
          `}
        />
      </div>
      {children}
    </div>
  );
}
