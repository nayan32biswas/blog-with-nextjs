import React from 'react';
import { useSlate } from 'slate-react';

import { CustomTextKey } from '../../custom.types';
import { isMarkActive, toggleMark } from '../../utils';
import { Button } from '../utility.component';

interface MarkButtonProps {
  format: CustomTextKey;
  icon: React.ReactNode;
}

export default function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate();

  return (
    <Button
      variant="outline"
      size="icon"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      data-active={isMarkActive(editor, format)}
      className="data-[active=true]:bg-secondary"
    >
      {icon}
    </Button>
  );
}
