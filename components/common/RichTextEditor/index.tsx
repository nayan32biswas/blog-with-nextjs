import isHotkey from 'is-hotkey';
import React, { KeyboardEvent, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

import { HOTKEYS } from './constants';
import { AlignType, CustomEditor } from './custom.types';
import ImageElement from './CustomElements/ImageElement';
import { editorStyles } from './editor.style';
import { Toolbar } from './Toolbar';
import { isAlignElement, toggleMark } from './utils';

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

  return (
    <div className={editorStyles} style={readOnly ? readOnlyStyles : {}}>
      <Slate editor={editor} initialValue={editorInitialValue} onChange={handleChange}>
        {readOnly ? null : <Toolbar />}
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

const DEFAULT_INITIAL_VALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
