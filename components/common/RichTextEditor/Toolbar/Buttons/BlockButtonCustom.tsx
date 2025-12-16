import React, { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import { CustomElementFormat } from '../../custom.types';
import { isBlockActive, toggleBlock } from '../../utils';
import { Button } from '../utility.component';

interface BlockButtonCustomProps {
  format: CustomElementFormat;
  icon: React.ReactNode;
}

export default function BlockButtonCustom({ format, icon }: BlockButtonCustomProps) {
  const editor = useSlate();

  return (
    <Button
      variant="outline"
      size="icon"
      className="data-[active=true]:bg-secondary"
      data-active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
}
