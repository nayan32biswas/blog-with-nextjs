import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Underline,
} from 'lucide-react';
import React from 'react';

import BlockButtonCustom from './Buttons/BlockButtonCustom';
import ImageButton from './Buttons/ImageButton';
import MarkButton from './Buttons/MarkButton';
import { Toolbar as ToolbarWrapper } from './utility.component';

export const Toolbar = () => {
  return (
    <ToolbarWrapper>
      <MarkButton format="bold" icon={<Bold className="h-4 w-4" />} />
      <MarkButton format="italic" icon={<Italic className="h-4 w-4" />} />
      <MarkButton format="underline" icon={<Underline className="h-4 w-4" />} />
      <MarkButton format="code" icon={<Code className="h-4 w-4" />} />

      <BlockButtonCustom format="heading-one" icon={<Heading1 className="h-4 w-4" />} />
      <BlockButtonCustom format="heading-two" icon={<Heading2 className="h-4 w-4" />} />
      <BlockButtonCustom format="block-quote" icon={<Quote className="h-4 w-4" />} />
      <BlockButtonCustom format="numbered-list" icon={<ListOrdered className="h-4 w-4" />} />
      <BlockButtonCustom format="bulleted-list" icon={<List className="h-4 w-4" />} />
      <BlockButtonCustom format="left" icon={<AlignLeft className="h-4 w-4" />} />
      <BlockButtonCustom format="center" icon={<AlignCenter className="h-4 w-4" />} />
      <BlockButtonCustom format="right" icon={<AlignRight className="h-4 w-4" />} />
      <BlockButtonCustom format="justify" icon={<AlignJustify className="h-4 w-4" />} />
      <ImageButton />
    </ToolbarWrapper>
  );
};
