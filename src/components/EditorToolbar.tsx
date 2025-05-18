import { Editor } from "@tiptap/react";
import { Toolbar } from "@liveblocks/react-tiptap";

type ToolbarItem =
  | "history"
  | "blockSelector"
  | "bold"
  | "italic"
  | "strikethrough"
  | "code"
  | "bulletList"
  | "orderedList";

interface EditorToolbarProps {
  editor: Editor | null;
  className?: string;
  toolbarItems?: ToolbarItem[];
}

const defaultToolbarItems: ToolbarItem[] = [
  "history",
  "blockSelector",
  "bold",
  "italic",
  "strikethrough",
  "code",
  "bulletList",
  "orderedList",
];

export function EditorToolbar({
  editor,
  className,
  toolbarItems = defaultToolbarItems,
}: EditorToolbarProps) {
  const renderToolbarItem = (item: ToolbarItem) => {
    switch (item) {
      case "history":
        return <Toolbar.SectionHistory key="history" />;
      case "blockSelector":
        return <Toolbar.BlockSelector key="blockSelector" />;
      case "bold":
        return (
          <Toolbar.Toggle
            key="bold"
            name="Bold"
            active={editor ? editor.isActive("bold") : false}
            shortcut=" ⌘B"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
        );
      case "italic":
        return (
          <Toolbar.Toggle
            key="italic"
            name="Italic"
            active={editor ? editor.isActive("italic") : false}
            shortcut=" ⌘I"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
        );
      case "strikethrough":
        return (
          <Toolbar.Toggle
            key="strikethrough"
            name="Strikethrough"
            active={editor ? editor.isActive("strike") : false}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          />
        );
      case "code":
        return (
          <Toolbar.Toggle
            key="code"
            name="< >"
            active={editor ? editor.isActive("code") : false}
            shortcut=" ⌘E"
            onClick={() => editor?.chain().focus().toggleCode().run()}
          />
        );
      case "bulletList":
        return (
          <Toolbar.Toggle
            key="bulletList"
            name="• List"
            active={editor ? editor.isActive("bulletList") : false}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          />
        );
      case "orderedList":
        return (
          <Toolbar.Toggle
            key="orderedList"
            name="1. List"
            active={editor ? editor.isActive("orderedList") : false}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Toolbar
      editor={editor}
      className={`flex flex-wrap items-center w-full gap-4 liveblocks-toolbar ${
        className || ""
      }`}
    >
      {toolbarItems.map(renderToolbarItem)}
    </Toolbar>
  );
}
