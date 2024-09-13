'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Transforms, Editor, Text, Element as SlateElement, Range } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bold, Italic, Underline, Link as LinkIcon, Type, PaintBucket, Palette } from 'lucide-react';

const CustomEditor = {
  toggleMark(editor, format) {
    const isActive = this.isMarkActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  addLink(editor, url) {
    if (!url) return;
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);

    if (isCollapsed) {
      const link = {
        type: 'link',
        url,
        children: [{ text: url }],
      };
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(
        editor,
        { type: 'link', url, children: [] },
        { split: true }
      );
    }
    Transforms.collapse(editor, { edge: 'end' });
  },

  removeLink(editor) {
    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
  },
};

const Leaf = ({ attributes, children, leaf }) => {
  let style = {};
  if (leaf.bold) style.fontWeight = 'bold';
  if (leaf.italic) style.fontStyle = 'italic';
  if (leaf.underline) style.textDecoration = 'underline';
  if (leaf.color) style.color = leaf.color;
  if (leaf.bgColor) style.backgroundColor = leaf.bgColor;
  if (leaf.fontSize) style.fontSize = leaf.fontSize;

  return <span {...attributes} style={style}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} href={element.url} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    default:
      return <p {...attributes} style={{ display: 'inline' }}>{children}</p>;
  }
};

const ToolbarButton = ({ format, icon: Icon }) => {
  const editor = useSlate();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
      className={`p-2 ${CustomEditor.isMarkActive(editor, format) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
      variant="outline"
    >
      <Icon size={18} />
    </Button>
  );
};

const ColorPicker = ({ format, icon: Icon }) => {
  const editor = useSlate();
  const [customColor, setCustomColor] = useState('');

  const applyColor = (color) => {
    format === 'color'
      ? CustomEditor.setColor(editor, color)
      : CustomEditor.setBgColor(editor, color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 bg-white text-gray-700" variant="outline"><Icon size={18} /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col gap-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-full h-8"
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              applyColor(customColor);
            }}
            className="w-full"
          >
            Apply Color
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const LinkEditor = () => {
  const editor = useSlate();
  const [url, setUrl] = useState('');

  const applyLink = () => {
    if (url) {
      CustomEditor.addLink(editor, url);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 bg-white text-gray-700" variant="outline"><LinkIcon size={18} /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              applyLink();
            }}
            className="w-full"
          >
            Apply Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const FontSizePicker = () => {
  const editor = useSlate();
  const sizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 bg-white text-gray-700" variant="outline"><Type size={18} /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col gap-1">
          {sizes.map((size) => (
            <button
              key={size}
              className="text-left px-2 py-1 hover:bg-gray-100 rounded"
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.setFontSize(editor, size);
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const EditorToolbar = () => {
  return (
    <div className="flex flex-wrap gap-1 mb-2 p-1 bg-gray-100 rounded">
      <ToolbarButton format="bold" icon={Bold} />
      <ToolbarButton format="italic" icon={Italic} />
      <ToolbarButton format="underline" icon={Underline} />
      <LinkEditor />
      <ColorPicker format="color" icon={Palette} />
      <ColorPicker format="bgColor" icon={PaintBucket} />
      <FontSizePicker />
    </div>
  );
};

const TextEditor = ({ content, onSave }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [editorContent, setEditorContent] = useState(content);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const saveContent = () => {
    onSave(editorContent);
  };

  return (
    <div className="relative">
      <Slate editor={editor} initialValue={editorContent} onChange={setEditorContent}>
        <EditorToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="prose mb-4 p-2 border rounded min-h-[100px]"
        />
      </Slate>
      <Button onClick={saveContent} className="absolute top-0 right-0 mt-2 mr-2">Save</Button>
    </div>
  );
};

export default TextEditor;