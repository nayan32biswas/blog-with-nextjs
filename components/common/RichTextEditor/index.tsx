import isHotkey from 'is-hotkey';
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
import React, { KeyboardEvent, MouseEvent, useCallback, useMemo } from 'react';
import { createEditor, Descendant, Editor, Element as SlateElement, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact,
} from 'slate-react';

import {
  CustomEditor,
  CustomElement,
  CustomElementType,
  CustomElementWithAlign,
  CustomTextKey,
} from './custom.types';
import ImageElement from './CustomElements/ImageElement';
import { editorStyles } from './editor.style';
import ImageButton from './ToolbarButtons/ImageButton';
import { Button, Toolbar } from './utility.component';

const HOTKEYS: Record<string, CustomTextKey> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;

type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
type ListType = (typeof LIST_TYPES)[number];
type CustomElementFormat = CustomElementType | AlignType | ListType;

const readOnlyStyles = {
  borderRadius: '0',
  padding: '0',
  border: 'none',
};

interface RichTextEditorProps {
  readOnly?: boolean;
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
}

const withImages = (editor: CustomEditor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  return editor;
};

export default function RichTextEditor({ onChange, initialValue, readOnly }: RichTextEditorProps) {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => {
    return withImages(withHistory(withReact(createEditor())));
  }, []);

  const editorInitialValue =
    initialValue && initialValue.length > 0 ? initialValue : DEFAULT_INITIAL_VALUE;

  const handleChange = (newValue: any) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];

        toggleMark(editor, mark);
      }
    }
  };

  const renderToolbar = () => {
    if (readOnly) return null;
    return (
      <Toolbar>
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
      </Toolbar>
    );
  };

  return (
    <div className={editorStyles} style={readOnly ? readOnlyStyles : {}}>
      <Slate editor={editor} initialValue={editorInitialValue} onChange={handleChange}>
        {renderToolbar()}
        <Editable
          readOnly={readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
}

const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  const isActive = isBlockActive(editor, format, isAlignType(format) ? 'align' : 'type');
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return <ImageElement attributes={attributes} children={children} element={element} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButtonCustom = ({
  format,
  icon,
}: {
  format: CustomElementFormat;
  icon: React.ReactNode;
}) => {
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
};

const MarkButton = ({ format, icon }: { format: CustomTextKey; icon: React.ReactNode }) => {
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
};

const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

const isAlignElement = (element: CustomElement): element is CustomElementWithAlign => {
  return 'align' in element;
};

const DEFAULT_INITIAL_VALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
