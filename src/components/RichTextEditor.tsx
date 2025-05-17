import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Initialize Yjs document
const ydoc = new Y.Doc();
const websocketProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "rich-text-demo",
  ydoc
);

// Get the shared text
const ytext = ydoc.getText("editor");

export function RichTextEditor() {
  const { setRichTextEditor, currentUser } = useStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: websocketProvider,
        user: {
          name: currentUser.name,
          color: currentUser.color,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      setRichTextEditor(editor);
    }
    return () => {
      setRichTextEditor(null);
    };
  }, [editor, setRichTextEditor]);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor?.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor?.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor?.isActive("heading", { level: 1 })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor?.isActive("heading", { level: 2 })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor?.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor?.isActive("orderedList")
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          Numbered List
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
