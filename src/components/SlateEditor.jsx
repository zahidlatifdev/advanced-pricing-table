import React, { useCallback, useMemo } from 'react'
import { createEditor, Transforms, Editor, Text, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, Link as LinkIcon } from 'lucide-react'

const CustomEditor = {
    isBoldMarkActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.bold === true : false
    },

    isItalicMarkActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.italic === true : false
    },

    isUnderlineMarkActive(editor) {
        const marks = Editor.marks(editor)
        return marks ? marks.underline === true : false
    },

    isLinkActive(editor) {
        const [link] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
        return !!link
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleLink(editor, url) {
        if (CustomEditor.isLinkActive(editor)) {
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
            })
        } else if (url) {
            const { selection } = editor
            const isCollapsed = selection && Range.isCollapsed(selection)
            const link = {
                type: 'link',
                url,
                children: isCollapsed ? [{ text: url }] : [],
            }

            if (isCollapsed) {
                Transforms.insertNodes(editor, link)
            } else {
                Transforms.wrapNodes(editor, link, { split: true })
                Transforms.collapse(editor, { edge: 'end' })
            }
        }
    },
}

const ToolbarButton = ({ format, icon: Icon }) => {
    const editor = useSlate()
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault()
                switch (format) {
                    case 'bold':
                        CustomEditor.toggleBoldMark(editor)
                        break
                    case 'italic':
                        CustomEditor.toggleItalicMark(editor)
                        break
                    case 'underline':
                        CustomEditor.toggleUnderlineMark(editor)
                        break
                    case 'link':
                        const url = window.prompt('Enter the URL of the link:')
                        if (url) CustomEditor.toggleLink(editor, url)
                        break
                }
            }}
            variant="outline"
            size="icon"
            className={`p-2 ${format === 'link'
                    ? CustomEditor.isLinkActive(editor)
                    : CustomEditor[`is${format.charAt(0).toUpperCase() + format.slice(1)}MarkActive`](editor)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background'
                }`}
        >
            <Icon className="h-4 w-4" />
        </Button>
    )
}

const SlateEditor = ({ value, onChange }) => {
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'link':
                return <a {...props.attributes} href={props.element.url}>{props.children}</a>
            default:
                return <p {...props.attributes}>{props.children}</p>
        }
    }, [])

    const renderLeaf = useCallback(props => {
        let { attributes, children } = props
        if (props.leaf.bold) {
            children = <strong>{children}</strong>
        }
        if (props.leaf.italic) {
            children = <em>{children}</em>
        }
        if (props.leaf.underline) {
            children = <u>{children}</u>
        }
        return <span {...attributes}>{children}</span>
    }, [])

    const editor = useMemo(() => withReact(createEditor()), [])

    return (
        <Slate editor={editor} initialValue={value} onChange={onChange}>
            <div className="mb-2 flex space-x-2">
                <ToolbarButton format="bold" icon={Bold} />
                <ToolbarButton format="italic" icon={Italic} />
                <ToolbarButton format="underline" icon={Underline} />
                <ToolbarButton format="link" icon={LinkIcon} />
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some text..."
                className="p-2 border rounded"
            />
        </Slate>
    )
}

export default SlateEditor