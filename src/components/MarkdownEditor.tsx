import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
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

export function MarkdownEditor() {
  const { setRichTextEditor, currentUser } = useStore();
  const [wordCount, setWordCount] = useState(0);

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
      setWordCount(editor.getText().trim().split(/\s+/).filter(Boolean).length);
      editor.on("update", () => {
        setWordCount(
          editor.getText().trim().split(/\s+/).filter(Boolean).length
        );
      });
    }
    return () => {
      setRichTextEditor(null);
    };
  }, [editor, setRichTextEditor]);

  return (
    <div className="h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 pb-4 flex items-center gap-4 bg-transparent">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("bold")
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("italic")
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          /
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("heading", { level: 1 })
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("heading", { level: 2 })
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("bulletList")
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          •
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`px-5 py-2 glass-btn-bg shadow rounded-full font-semibold text-gray-700 text-lg border border-gray-100 transition-all
            hover:bg-white/70 active:bg-white/90 focus:ring-2 focus:ring-blue-200
            ${
              editor?.isActive("orderedList")
                ? " ring-2 ring-blue-200 !text-blue-600 !bg-blue-50 "
                : ""
            }`}
        >
          1.
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto m-4">
        <EditorContent editor={editor} />
      </div>

      {/* Word Count */}
      <div className="absolute bottom-4 right-8 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700 shadow">
        {wordCount} word{wordCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
